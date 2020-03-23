Soundscape Generator
====================

This project provides a web application for scanning images and videos with Amazon Rekognition to retrieve a list of labels for the media asset. These labels are then used to query a sound library and retrieve a bundle of audio clips that will form an audio backdrop for the media asset.

Getting Started w/ Local Deployment
---------------

1. Build the frontend

        $ npm install   # inside src/frontend
        $ npm run build

2. Configure AWS credentials: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

3. Create a Python virtual environment:

        $ virtualenv .venv  # back in the project's root folder

4. Activate the virtual environment:

        $ source .venv/bin/activate

5. Install Python dependencies for this project:

        $ pip install -r requirements.txt

6. Start the Flask development server:

        $ python src/application.py --port 8000
        # For Debug:
        $ python src/application.py --port 8000 --debug

7. Open http://127.0.0.1:8000/ in a web browser
