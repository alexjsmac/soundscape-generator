#!flask/bin/python
import os
import boto3

from flask import Flask, make_response
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse, abort
from cStringIO import StringIO
from werkzeug.datastructures import FileStorage

application = Flask(__name__,  static_folder='frontend/build/static')
api = Api(application)

DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = 'soundscape-generator-photos'
ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']
s3 = boto3.resource('s3')


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

        return {"HTTPStatusCode": str(result['ResponseMetadata']
                                            ['HTTPStatusCode'])}


class Scan(Resource):

    def get(self, image):
        return self.detect_labels(BUCKET, image)

    def detect_labels(self, bucket, key, max_labels=10, min_confidence=80,
                      region="us-east-1"):
        rekognition = boto3.client("rekognition", region)
        response = rekognition.detect_labels(
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
        for label in response['Labels']:
            labels.append(label['Name'])
        return labels


@application.route('/')
def show_index():
    return make_response(open(os.path.join(DIR,
                         'frontend/build/index.html')).read())


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(Scan, '/api/v1/scan/<image>')

if __name__ == '__main__':
    flaskrun(application)    # prod
    # application.run(threaded=True, debug=True)   # dev
