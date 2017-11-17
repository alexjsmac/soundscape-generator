#!flask/bin/python
import os
import boto3

from flask import Flask, make_response
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse

application = Flask(__name__,  static_folder='build/static')
api = Api(application)

DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = 'soundscape-generator-photos'
s3 = boto3.client('s3')
parser = reqparse.RequestParser()
parser.add_argument('image')


class Upload(Resource):
    def post(self):
        return "its working"



class Scan(Resource):
    def post(self):
        args = parser.parse_args()
        return self.detect_labels(BUCKET, args['image'])

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
        return response['Labels']


@application.route('/')
def show_index():
    return make_response(open(os.path.join(DIR, 'build/index.html')).read())


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(Scan, '/api/v1/scan')

if __name__ == '__main__':
    flaskrun(application)    # prod
    # application.run(debug=True, threaded=True)   # dev
