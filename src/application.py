#!flask/bin/python
import os
import boto3
import werkzeug

from flask import Flask, make_response
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse, abort
from cStringIO import StringIO
from werkzeug.datastructures import FileStorage

application = Flask(__name__,  static_folder='frontend/build/static')
api = Api(application)

# config
DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = 'soundscape-generator-photos'
s3 = boto3.client('s3')

ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']
FILE_CONTENT_TYPES = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png'
}


## Helper Methods
def upload_s3(file, key_name, content_type, bucket_name):
    """Uploads a given StringIO object to S3. Closes the file after upload.
    Returns the URL for the object uploaded.
    Note: The acl for the file is set as 'public-acl' for the file uploaded.
    Keyword Arguments:
    file -- StringIO object which needs to be uploaded.
    key_name -- key name to be kept in S3.
    content_type -- content type that needs to be set for the S3 object.
    bucket_name -- name of the bucket where file needs to be uploaded.
    """
    # create connection
    # conn = S3Connection(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'])

    # upload the file after getting the right bucket
    obj = s3.Object(bucket_name, key_name)
    obj.content_type = content_type
    obj.set_contents_from_string(file.getvalue())
    # obj.set_acl('public-read')

    # close stringio object
    file.close()

    return obj.generate_url(expires_in=0, query_auth=False)


class FileStorageArgument(reqparse.Argument):
    """This argument class for flask-restful will be used in
    all cases where file uploads need to be handled."""

    def convert(self, value, op):
        if self.type is FileStorage:  # only in the case of files
            # this is done as self.type(value) makes the name attribute of the
            # FileStorage object same as argument name and value is a FileStorage
            # object itself anyways
            return value

        # called so that this argument class will also be useful in
        # cases when argument type is not a file.
        super(FileStorageArgument, self).convert(*args, **kwargs)


class Upload(Resource):

    put_parser = reqparse.RequestParser(argument_class=FileStorageArgument)
    put_parser.add_argument('image', required=True, type=FileStorage, location='files')

    def post(self):
        # TODO: a check on file size needs to be there.

        args = self.put_parser.parse_args()
        image = args['image']

        # check logo extension
        extension = image.filename.rsplit('.', 1)[1].lower()
        if '.' in image.filename and extension not in application.config['ALLOWED_EXTENSIONS']:
            abort(400, message="File extension is not one of our supported types.")

        # create a file object of the image
        image_file = StringIO()
        image.save(image_file)

        # upload to s3
        key_name = '{0}.{1}'.format('some-name', extension)
        content_type = application.config['FILE_CONTENT_TYPES'][extension]
        bucket_name = 'bucket-is-me'
        logo_url = upload_s3(image_file, key_name, content_type, bucket_name)

        return {'logo_url': logo_url}


class Scan(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('image')
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
    return make_response(open(os.path.join(DIR, 'frontend/build/index.html')).read())


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(Scan, '/api/v1/scan')

if __name__ == '__main__':
    #flaskrun(application)    # prod
    application.run(threaded=True, debug=True)   # dev
