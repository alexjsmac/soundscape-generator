Soundscape Generator
====================

This project provides a web application for scanning images and videos with Amazon Rekognition to retrieve a list of labels for the media asset. These labels are then used to query a sound library and retrieve a bundle of audio clips that will form an audio backdrop for the media asset.

Getting Started w/ Local Deployment
---------------

1. Configure AWS credentials: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

2. Create a Python virtual environment:

        $ virtualenv .venv

3. Activate the virtual environment:

        $ source .venv/bin/activate

4. Install Python dependencies:

        $ pip install -r requirements.txt

5. Run the server locally:

        $ npm run build
        $ npm start

6. Open http://127.0.0.1:8000/ in a web browser
