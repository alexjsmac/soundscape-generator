#!flask/bin/python
import os
import boto3
import botocore
import requests

from flask import Flask, render_template, make_response
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse

DIR = os.path.dirname(os.path.abspath(__file__))
application = Flask(__name__,  static_folder='build/static')
api = Api(application)

s3 = boto3.client('s3')
BUCKET = 'soundscape-generator-photos'


def detect_labels(bucket, key, max_labels=10, min_confidence=80, region="us-east-1"):
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


class Upload(Resource):
    def get(self):
        return detect_labels(BUCKET, 'lion-cubs.jpg')


@application.route('/')
def show_index():
    return make_response(open(os.path.join(DIR, 'build/index.html')).read())


@application.route('/', methods=['POST'])
def post():
    return '{"Output":"Hello World"}'


api.add_resource(Upload, '/api/v1/upload')

if __name__ == '__main__':
    flaskrun(application)
    #application.run(debug=True)
