#!flask/bin/python
import os
import boto3

from flask import Flask, make_response, request, Response, redirect, render_template
from flaskrun import flaskrun
from flask_restful import Resource, Api, reqparse, abort
from cStringIO import StringIO
from werkzeug.datastructures import FileStorage
from flask_login import LoginManager, UserMixin, \
                                login_required, login_user, logout_user

application = Flask(__name__,  static_folder='frontend/build/static')
api = Api(application)

DIR = os.path.dirname(os.path.abspath(__file__))
BUCKET = 'soundscape-generator-photos'
ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']
s3 = boto3.resource('s3')

# flask-login
# login_manager = LoginManager()
# login_manager.init_app(application)
# login_manager.login_view = "login"
# application.config.update(SECRET_KEY='secret_123')


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


class Scan(Resource):

    def get(self, image):
        labels = self.detect_labels(image)
        room_material = self.get_room_material(image)
        room_size = self.get_room_size(room_material)
        return {
            "Labels": labels,
            "RoomMaterial": room_material,
            "RoomSize": room_size
        }

    def detect_labels(self, key, bucket=BUCKET, max_labels=10, min_confidence=80,
                      region="us-east-1"):
        rekognition = boto3.client("rekognition", region)
        rek_results = rekognition.detect_labels(
            Image={
                "S3Object": {
                    "Bucket": BUCKET,
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

    def get_room_material(self, image):
        # MATERIAL_TYPES = ['brick', 'concrete', 'curtain', 'fiberglass',
        #                   'grass', 'linoleum', 'marble', 'metal', 'parquet',
        #                   'plaster', 'plywood', 'sheetrock', 'water', 'ice']
        labels = self.detect_labels(image, max_labels=50, min_confidence=1)
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

    def get_room_size(self, room_material):
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


# silly user model
# class User(UserMixin):
#
#     def __init__(self, id):
#         self.id = id
#         self.name = "user" + str(id)
#         self.password = self.name + "_secret"
#
#     def __repr__(self):
#         return "%d/%s/%s" % (self.id, self.name, self.password)


# create some users with ids 1 to 20
# users = [User(id) for id in range(1, 21)]


# @application.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         if password == username + "_secret":
#             id = username.split('user')[1]
#             user = User(id)
#             login_user(user)
#             return redirect(request.args.get("next"))
#         else:
#             return abort(401)
#     else:
#         return render_template('login.html')


@application.route('/')
def hello():
    return render_template('layout.html')


@application.route('/soundscapes')
def show_index():
    return make_response(open(os.path.join(DIR,
                         'frontend/build/index.html')).read())


# somewhere to logout
# @application.route("/logout")
# @login_required
# def logout():
#     logout_user()
#     return Response('<p>Logged out</p>')


# handle login failed
# @application.errorhandler(401)
# def page_not_found(e):
#     return Response('<p>Login failed</p>')


# callback to reload the user object
# @login_manager.user_loader
# def load_user(userid):
#     return User(userid)


api.add_resource(Upload, '/api/v1/upload')
api.add_resource(Scan, '/api/v1/scan/<image>')

if __name__ == '__main__':
    flaskrun(application)
