#!flask/bin/python
import os
import boto3
import json

from flask import Flask, make_response, render_template
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse, abort
from cStringIO import StringIO
from werkzeug.datastructures import FileStorage

application = Flask(__name__,  static_folder='frontend/build/static')
api = Api(application)

DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = 'soundscape-generator-photos'
ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'mp4']
QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/667582492015/AmazonRekogntionVideoAnalysis'
SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:667582492015:AmazonRekognitionVideoAnalysis'
ROLE_ARN = 'arn:aws:iam::667582492015:role/RekognitionRole'

s3 = boto3.resource('s3')


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

    def upload_s3(self, file_obj, key_name, bucket_name):
        obj = s3.Object(bucket_name, key_name)
        result = obj.put(Body=file_obj.getvalue())
        file_obj.close()
        return result

    def post(self):
        args = self.parser.parse_args()
        image = args['image']

        extension = image.filename.rsplit('.', 1)[1].lower()
        if '.' in image.filename and extension not in ALLOWED_EXTENSIONS:
            abort(400, message="File extension is not supported.")

        image_file = StringIO()
        image.save(image_file)
        result = self.upload_s3(image_file, image.filename, BUCKET)

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

    def detect_labels(self, key, bucket=BUCKET, max_labels=10, min_confidence=80,
                      region="us-east-1"):
        rekognition = boto3.client("rekognition", region)
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
        labels = []
        for label in rek_results['Labels']:
            labels.append(label['Name'])
        return labels


class VideoScanStart(Resource):

    def get(self, video):
        job_id = self.begin_video_analysis(video)
        return {
            "job_id": job_id
        }

    def begin_video_analysis(self, key, bucket=BUCKET, max_labels=10, min_confidence=80,
                             region="us-east-1"):
        rekognition = boto3.client("rekognition", region)
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

    def poll_queue(self, region="us-east-1"):
        sqs = boto3.client('sqs', region)
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

    def get_video_labels(self, job_id, region="us-east-1"):
        rekognition = boto3.client("rekognition", region)
        response = rekognition.get_label_detection(
            JobId=job_id,
            MaxResults=10,
            SortBy="TIMESTAMP"
            )
        labels = []
        for label in response['Labels']:
            labels.append(label['Label']['Name'])
        return labels


@application.route('/')
def hello():
    return render_template('layout.html')


@application.route('/soundscapes')
def show_index():
    return make_response(open(os.path.join(DIR,
                         'frontend/build/index.html')).read())


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(ImageScan, '/api/v1/scan/<image>')
api.add_resource(VideoScanStart, '/api/v1/videoscan/<video>')
api.add_resource(VideoScanResults, '/api/v1/videoscanresults/<job_id>')

if __name__ == '__main__':
    flaskrun(application)
