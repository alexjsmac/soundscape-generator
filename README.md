Soundscape Generator
====================

This project provides a web application for scanning images and videos with Amazon Rekognition to retrieve a list of labels for the media asset. These labels are then used to query a sound library and retrieve a bundle of audio clips that will form an audio backdrop for the media asset.

Live Site
---------

http://ec2-34-231-21-21.compute-1.amazonaws.com/

Getting Started
---------------

1. Create a Python virtual environment:

        $ virtualenv .venv

2. Activate the virtual environment:

        $ source .venv/bin/activate

3. Install Python dependencies for this project:

        $ pip install -r requirements.txt

4. Start the Flask development server:

        $ python src/application.py --port 8000

5. Open http://127.0.0.1:8000/ in a web browser
