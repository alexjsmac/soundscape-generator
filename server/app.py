import os

import boto3
import json

from flask import Flask, render_template, send_from_directory
from flask_restful import Resource, Api, reqparse, abort
from flask_cors import CORS
from werkzeug.datastructures import FileStorage
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../client/build/', static_url_path='/')
api = Api(app)
CORS(app)

DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = os.getenv('S3_BUCKET', 'soundscape-generator-photos')
ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'mp4']
QUEUE_URL = os.getenv('SQS_QUEUE_URL')
SNS_TOPIC_ARN = os.getenv('SNS_TOPIC_ARN')
ROLE_ARN = os.getenv('IAM_ROLE_ARN')
AWS_PROFILE = os.getenv('AWS_PROFILE', 'personal')
AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')

# Initialize boto3 session with profile
session = boto3.Session(profile_name=AWS_PROFILE)
s3 = session.client('s3')


def get_room_material(labels):
    # MATERIAL_TYPES = ['brick', 'concrete', 'curtain', 'fiberglass',
    #                   'grass', 'linoleum', 'marble', 'metal', 'parquet',
    #                   'plaster', 'plywood', 'sheetrock', 'water', 'ice']
    room_material = ''
    for label in labels:
        lower_label = label.lower()
        if lower_label in ['grass', 'water', 'ice']:
            room_material = 'OUTSIDE'
        elif lower_label in ['curtain', 'curtains', 'linoleum', 'parquet']:
            room_material = 'CURTAINS'
        elif lower_label in ['brick', 'sheetrock', 'concrete']:
            room_material = 'BRICK'
        elif lower_label in ['marble' 'glass', 'fiberglass', ]:
            room_material = 'MARBLE'
        else:
            room_material = 'OUTSIDE'
    return room_material


def get_room_size(room_material):
    room_size = ''
    if room_material == 'OUTSIDE':
        room_size = 'HUGE'
    elif room_material == 'CURTAINS':
        room_size = 'SMALL'
    elif room_material == 'BRICK':
        room_size = 'MEDIUM'
    elif room_material == 'MARBLE':
        room_size = 'LARGE'
    return room_size


class Upload(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('image',
                        required=True,
                        type=FileStorage,
                        location='files')

    def post(self):
        args = self.parser.parse_args()
        image = args['image']

        extension = image.filename.rsplit('.', 1)[1].lower()
        if '.' in image.filename and extension not in ALLOWED_EXTENSIONS:
            abort(400, message="File extension is not supported.")

        result = s3.put_object(Body=image,
                               Bucket=BUCKET,
                               Key=image.filename,
                               ContentType=json.dumps({"ContentType": "image/png"}))
        return {
            "HTTPStatusCode": str(result['ResponseMetadata']['HTTPStatusCode']),
            "fileName": image.filename
        }


class ImageScan(Resource):

    def get(self, image):
        labels = self.detect_labels(image)
        room_material = get_room_material(labels)
        room_size = get_room_size(room_material)
        return {
            "labels": labels,
            "roomMaterial": room_material,
            "roomSize": room_size
        }

    def detect_labels(self, key, bucket=BUCKET, max_labels=10,
                      min_confidence=80, region=None):
        if region is None:
            region = AWS_REGION
        rekognition = session.client("rekognition", region_name=region)
        
        # Try to detect labels with the provided key first
        try:
            rek_results = rekognition.detect_labels(
                Image={
                    "S3Object": {
                        "Bucket": bucket,
                        "Name": key,
                    }
                },
                MaxLabels=max_labels,
                MinConfidence=min_confidence,
            )
        except rekognition.exceptions.InvalidS3ObjectException:
            # If the object is not found, try looking in the examples folder
            examples_key = f"examples/{key}"
            try:
                rek_results = rekognition.detect_labels(
                    Image={
                        "S3Object": {
                            "Bucket": bucket,
                            "Name": examples_key,
                        }
                    },
                    MaxLabels=max_labels,
                    MinConfidence=min_confidence,
                )
            except rekognition.exceptions.InvalidS3ObjectException:
                # If still not found, raise the original error with helpful message
                raise Exception(f"S3 object not found: tried both '{key}' and '{examples_key}' in bucket '{bucket}'")
        labels = []
        for label in rek_results['Labels']:
            labels.append(label['Name'])
        labels = list(set(labels))
        return labels


class VideoScanStart(Resource):

    def get(self, video):
        job_id = self.begin_video_analysis(video)
        return {
            "jobId": job_id
        }

    def begin_video_analysis(self, key, bucket=BUCKET,
                             min_confidence=80, region=None):
        if region is None:
            region = AWS_REGION
        rekognition = session.client("rekognition", region_name=region)
        
        # Try to start video analysis with the provided key first
        try:
            response = rekognition.start_label_detection(
                Video={
                    'S3Object': {
                        'Bucket': bucket,
                        'Name': key
                    }
                },
                MinConfidence=min_confidence,
                NotificationChannel={
                    'SNSTopicArn': SNS_TOPIC_ARN,
                    'RoleArn': ROLE_ARN
                },
                JobTag=key
            )
        except rekognition.exceptions.InvalidS3ObjectException:
            # If the object is not found, try looking in the examples folder
            examples_key = f"examples/{key}"
            try:
                response = rekognition.start_label_detection(
                    Video={
                        'S3Object': {
                            'Bucket': bucket,
                            'Name': examples_key
                        }
                    },
                    MinConfidence=min_confidence,
                    NotificationChannel={
                        'SNSTopicArn': SNS_TOPIC_ARN,
                        'RoleArn': ROLE_ARN
                    },
                    JobTag=examples_key
                )
            except rekognition.exceptions.InvalidS3ObjectException:
                # If still not found, raise the original error with helpful message
                raise Exception(f"S3 object not found: tried both '{key}' and '{examples_key}' in bucket '{bucket}'")
        job_id = response['JobId']
        return job_id


class VideoScanResults(Resource):

    def get(self, job_id):
        labels = self.get_video_labels(job_id)
        if labels:
            room_material = get_room_material(labels)
            room_size = get_room_size(room_material)
            return {
                "labels": labels,
                "room_material": room_material,
                "room_size": room_size
            }
        else:
            return {
                "labels": labels
            }

    def poll_queue(self, region=None):
        if region is None:
            region = AWS_REGION
        sqs = session.client('sqs', region_name=region)
        response = sqs.receive_message(
            QueueUrl=QUEUE_URL,
            AttributeNames=[
                'All'
            ],
            MaxNumberOfMessages=1,
            MessageAttributeNames=[
                'All'
            ],
            WaitTimeSeconds=20
        )
        body = json.loads(response['Messages'][0]['Body'])
        message = json.loads(body['Message'])
        return message

    def get_video_labels(self, job_id, region=None):
        if region is None:
            region = AWS_REGION
        rekognition = session.client("rekognition", region_name=region)
        response = rekognition.get_label_detection(
            JobId=job_id,
            MaxResults=10,
            SortBy="TIMESTAMP"
        )
        labels = []
        for label in response['Labels']:
            labels.append(label['Label']['Name'])
        labels = list(set(labels))
        return labels


@app.route('/')
def hello():
    return render_template('layout.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


@app.route('/soundscapes')
def serve_soundscapes():
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(ImageScan, '/api/v1/imagescan/<image>')
api.add_resource(VideoScanStart, '/api/v1/videoscanstart/<video>')
api.add_resource(VideoScanResults, '/api/v1/videoscanresults/<job_id>')

if __name__ == '__main__':
    app.run(port=(os.getenv('PORT') if os.getenv('PORT') else 8000), debug=False)
