# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This project is a full-stack "Soundscape Generator" web app. Users upload an image or video; the backend uses Amazon Rekognition to extract labels, and the frontend uses those labels to fetch related audio clips from Freesound and render an immersive soundscape using the Web Audio API and ResonanceAudio.

**Stack:**
- Backend: Python, Flask, Flask-RESTful, Gunicorn, boto3 (S3, Rekognition, SQS/SNS), Jinja2 templates.
- Frontend: React (Vite-based), Redux + redux-thunk, styled-components, Tailwind CSS, Ant Design.
- External services: AWS (S3 + Rekognition + SQS/SNS), Freesound API, WebAudio/ResonanceAudio.

Use Node.js 22 when running npm commands in this repo.

## Commands and workflows

### Install dependencies

From the repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

npm install
# installs root dependencies and the `client` workspace
```

### Run the full app locally (backend + built frontend)

This follows the flow described in `README.md` and is the main way to run the app end-to-end:

```bash
# from repo root (after installing deps and activating the venv)
npm run build      # builds the React app into client/build
npm start          # runs Gunicorn with server.app:app
# then open http://127.0.0.1:8000/
```

Details:
- `npm start` uses the root `package.json` script: `gunicorn server.app:app`.
- Flask is also wired with `if __name__ == "__main__"` in `server/app.py`, so for quick backend-only runs you can do:
  ```bash
  python server/app.py  # listens on port 8000 by default
  ```
  This still expects a built frontend in `client/build` for the `/soundscapes` route.

### Frontend-only development server

For working primarily on the React UI with hot reloading:

```bash
# from repo root
npm run dev:fe        # runs `npm run dev` in the client workspace on port 3000

# or equivalently
cd client
npm run dev           # vite --port 3000
```

Notes:
- The Vite config outputs the production build to `client/build`, which is what Flask serves from `server/app.py`.
- CORS is enabled on the Flask app (`flask_cors.CORS(app)`), so the Vite dev server on port 3000 can call the Flask API on port 8000.

### Building the frontend

```bash
# from repo root
npm run build         # runs `npm run build -w client`, generating client/build

# from client only
cd client
npm run build         # vite build
```

### Code formatting / linting

There is currently only a formatter configured for the frontend:

```bash
cd client
npm run format        # prettier --write .
```

There are no JavaScript/TypeScript lint scripts (e.g., ESLint) or Python linters configured at this time.

### Tests

There are no automated test scripts configured in `package.json` or Python test modules in this repo as of this writing, so there is no canonical `npm test` / `pytest` workflow yet.

If you introduce tests, make sure to add explicit scripts (e.g., `npm test` in `client/package.json` or a `test` script in the root `package.json`) so future agents know how to execute them.

### Deployment

The repo includes a Heroku-style `Procfile`:

```text
web: npm start
```

This relies on the root `npm start` script (Gunicorn running `server.app:app`). Any deployment mechanism that understands `Procfile` will use this entrypoint.

## High-level architecture

### Top-level layout

- `server/` — Python/Flask backend, REST API, and HTML templates.
- `client/` — React single-page app built with Vite; compiled assets are emitted to `client/build`.
- `package.json` (root) — npm workspaces configuration and high-level scripts.
- `requirements.txt` — Python backend dependencies.
- `Procfile` — Deployment entrypoint (`web: npm start`).

The Flask app is configured with `static_folder="../client/build/"` and `static_url_path="/"`, so a production frontend build must exist before serving the SPA via Flask.

### Backend: Flask + AWS Rekognition pipeline

Backend entrypoint: `server/app.py`.

Key pieces:
- **Flask app setup**
  - Creates `Flask` app with `static_folder` pointing to `client/build`.
  - Wraps app with `flask_restful.Api` for class-based resources.
  - Enables CORS via `flask_cors.CORS(app)`.
  - Loads environment variables from `.env` via `python-dotenv`.

- **Constants / configuration** (currently hard-coded in `server/app.py`):
  - `BUCKET` — S3 bucket for uploaded media (e.g., `soundscape-generator-photos`).
  - `ALLOWED_EXTENSIONS` — supported file types: `jpg`, `jpeg`, `png`, `mp4`.
  - `QUEUE_URL`, `SNS_TOPIC_ARN`, `ROLE_ARN` — AWS SQS/SNS and IAM role identifiers for video label detection.
  - `PORT` — optionally taken from the `PORT` environment variable when running with `python server/app.py`.

- **AWS clients:**
  - Global `boto3.client("s3")` is used for uploads.
  - Per-request Rekognition and SQS clients are created where needed.

- **Room modeling helpers:**
  - `get_room_material(labels)` — maps Rekognition labels (e.g., `grass`, `water`, `curtains`, `brick`, `marble`, etc.) to a coarse room material type (`OUTSIDE`, `CURTAINS`, `BRICK`, `MARBLE`).
  - `get_room_size(room_material)` — maps material types to a room size (`HUGE`, `SMALL`, `MEDIUM`, `LARGE`).
  - These outputs are sent to the frontend and used to configure the ResonanceAudio scene.

- **REST resources (Flask-RESTful):**
  - `Upload` (`POST /api/v1/upload`)
    - Expects multipart form data with a single `image` field (`FileStorage`).
    - Validates extension against `ALLOWED_EXTENSIONS`.
    - Uploads the file to S3 (`BUCKET`) using `put_object`.
    - Returns `HTTPStatusCode` and `fileName` for subsequent scan calls.
  - `ImageScan` (`GET /api/v1/imagescan/<image>`)
    - Calls Rekognition `detect_labels` on the uploaded image in S3.
    - De-duplicates labels, maps them into a room material and size, and returns:
      ```json
      {
        "labels": [...],
        "roomMaterial": "OUTSIDE" | "CURTAINS" | "BRICK" | "MARBLE",
        "roomSize": "SMALL" | "MEDIUM" | "LARGE" | "HUGE"
      }
      ```
  - `VideoScanStart` (`GET /api/v1/videoscanstart/<video>`)
    - Calls Rekognition `start_label_detection` for an S3 video object.
    - Configured with `NotificationChannel` pointing at an SNS topic and IAM role.
    - Returns a `jobId` used to poll for results.
  - `VideoScanResults` (`GET /api/v1/videoscanresults/<job_id>`)
    - Uses Rekognition `get_label_detection` to retrieve labels for a completed job.
    - If labels exist, returns labels plus derived `room_material` and `room_size`; otherwise returns an empty labels array.

- **HTML routes / static serving:**
  - `@app.route('/')` — renders `server/templates/layout.html`, which is a Bootstrap-based landing page with an "Enter" button.
  - `@app.route('/<path:path>')` — serves arbitrary static assets from `client/build` (e.g., JS/CSS bundles).
  - `@app.route('/soundscapes')` — always serves `client/build/index.html`; this is the SPA entrypoint.

Backend behavior is tightly coupled to:
- The S3 bucket and AWS configuration constants.
- The fact that production frontend assets are expected at `client/build`.

When adjusting any of these, ensure the Vite build output path stays aligned with the Flask `static_folder` configuration and that the front-end `media/actions.js` endpoints (`/api/v1/...`) stay in sync.

### Frontend: React + Redux + Web Audio

The frontend lives in `client/` and is a Vite app (see `client/vite.config.js`). The main concepts are:

#### Entry and global providers

- `client/src/components/App.jsx`
  - Creates a Redux store via `configureStore()` from `client/src/core/store/configureStore.js`.
  - Immediately wires the store into the Web Audio / ResonanceAudio layer via `webAudioUtil.connectToStore(store)`.
  - Wraps the UI with React-Redux `<Provider>` and styled-components `<ThemeProvider>` using `client/src/components/theme.js`.
  - Renders the main UI via `<MainPage />`.

- `client/src/audio/webAudioUtil.js`
  - Creates a global `AudioContext` and `ResonanceAudio` scene off `window.AudioContext` and `window.ResonanceAudio` (the latter must be loaded via a `<script>` tag in `index.html`).
  - Exposes two main helpers:
    - `createAudioSource(audioElement)` — wraps an `HTMLAudioElement` into a ResonanceAudio source node and returns it.
    - `connectToStore(store)` — subscribes to Redux store changes and updates the ResonanceAudio room properties (`roomDimensions`, `roomMaterials`) whenever `state.audio` changes.

This means any changes to the `audio` slice structure or `room-settings` logic must remain compatible with what `webAudioUtil` expects.

#### State management (Redux)

Redux is organized under `client/src/core/` into domain-specific modules, each with `action-types.js`, `actions.js`, `reducer.js`, and an `index.js` for re-exports:

- `app/` — controls high-level navigation state between the media selection and media player screens.
  - `actions.js` exposes `toMediaPlayer()` and `toMediaSelection()` that drive which screen is shown.
- `media/` — orchestrates the upload and scanning flow for media files.
  - `actions.js` defines the main asynchronous workflow:
    - `uploadMedia(file)` — uploads the file to `/api/v1/upload`, then kicks off scanning.
    - `setMedia({ source, fileName })` — stores the local media preview and media type, then triggers `startScan()`.
    - `scanImage(fileName)` and `scanVideoStart(fileName)` encapsulate the image vs. video flows using the Flask API.
    - `getVideoResults(jobId)` encapsulates polling of `VIDEO_SCAN_RESULTS` until labels are available.
  - All API calls are made against `window.location.origin + /api/v1/...`, so they line up with however the backend is hosted.
- `general/` — manages auxiliary UI state, including the list of labels (`keywords`) returned from Rekognition.
- `sounds/` — manages fetched sound metadata and playback state per label.
  - `actions.js` contains the Freesound integration via a `freeSoundService` singleton.
  - `getAllSounds()` looks at `state.general.keywords` and for each label:
    - Calls `freeSoundService.search(keyword)` to get a list of candidate sounds.
    - Populates Redux with a sound list and triggers `getSoundForKeyword(keyword)` to hydrate full metadata.
  - `getSoundForKeyword(keyword)` uses `freeSoundService.sound(id)` to fetch preview URLs and metadata for a chosen sound.
  - NOTE: `freeSoundService` currently uses a hard-coded Freesound API token. If you need to rotate or secure this, update `client/src/core/sounds/actions.js` to source the token from a backend or environment configuration instead of bundling it in the client.
- `audio/` — models room size/materials used to configure the ResonanceAudio scene.
  - `room-settings.js` defines `roomSizes`, `roomTypes`, and mapping helpers `getRoomDimensions(roomSize)` and `getRoomMaterials(roomType)`.

All reducers are combined in `client/src/core/reducers.js`, and store configuration (including any dev/prod-specific middleware or enhancers) lives under `client/src/core/store/`.

#### UI components and layout

The React component tree is organized under `client/src/components/`:

- Top-level structure:
  - `MainPage.jsx` — orchestrates the main layout: header/top bar, media upload card, and player area.
  - `TopBar.jsx` — contains the main navigation/header UI.
- Media handling (`components/media/`):
  - `MediaUploader.jsx` — Ant Design `Upload.Dragger`-based drag-and-drop uploader.
    - Uses a `FileReader` to generate a local preview and dispatches `mediaActions.setMedia({ source, fileName })`.
    - Dispatches `mediaActions.uploadMedia(file)` to send the payload to the backend.
  - Other components in this folder handle the display of selected media and example thumbnails.
- Player and audio controls (`components/player/`):
  - `PlayerPage.jsx` — main soundscape player screen.
    - Uses `useSelector` to read `media.source` and `media.type` from Redux.
    - Renders the visual media (`<Media />`), `PlayAllButton`, `RoomSettings` UI, `AddLabelForm`, and a scrollable list of `Results` (per-label audio players).
    - Uses `useScreen()` from `client/src/hooks/use-screen.js` to adapt layout for mobile vs. desktop.
  - `AudioPlayer` subfolder contains:
    - `AudioPlayerContext.jsx` — React context with playback controls and state for a single sound.
    - `AudioPlayerProvider.jsx` — Redux-connected component that:
      - Creates and manages an `HTMLAudioElement` for the selected sound preview.
      - Wraps that element in a ResonanceAudio source via `webAudioUtil.createAudioSource`.
      - Synchronizes play/pause and spatialization parameters with Redux state and internal component state.
      - Exposes a context API (toggle play, shuffle, position, gain) to child components.
- Shared UI library (`components/lib/`):
  - Contains reusable presentational components such as `Card`, `Button`, `H2`, layout helpers like `gridBorder`, and an index file for easy imports.
- Theming:
  - `components/theme.js` defines the styled-components theme used throughout the app.
  - Tailwind is configured via `client/tailwind.config.js` and applied to `.jsx` files under `src/`.

#### Hooks

- `client/src/hooks/use-screen.js` — centralizes mobile vs. desktop layout logic and is used by components like `PlayerPage` to alter UI based on viewport size.
- `client/src/hooks/index.js` — re-exports custom hooks for simplified imports.

### External services and configuration points

When modifying or extending the project, be aware of these key integration points:

- **AWS credentials and configuration**
  - Boto3 in `server/app.py` reads AWS credentials from the standard environment / AWS config files (see the root `README.md` step about configuring the AWS CLI).
  - The S3 bucket and Rekognition/SQS/SNS identifiers are currently hard-coded constants in `server/app.py`. If you change these, ensure the media upload and scan flows continue to work and that any IAM roles have the necessary permissions.

- **Freesound API**
  - Located entirely in `client/src/core/sounds/actions.js` inside the `freeSoundService` singleton.
  - All calls use a static `Authorization: Token ...` header and hit `https://freesound.org/apiv2`.
  - If you need to change the sound source or secure the token, this is the single place to do it.

- **ResonanceAudio / Web Audio**
  - `webAudioUtil` assumes `window.ResonanceAudio` is available at runtime (included via a script tag in the HTML shell).
  - Any refactor of the audio engine should update both `webAudioUtil` and the `AudioPlayerProvider` to maintain the subscription to the Redux `audio` slice and the per-sound spatialization behavior.

- **Frontend–backend contract**
  - The frontend `media/actions.js` assumes the backend provides:
    - `POST /api/v1/upload` → `{ HTTPStatusCode, fileName }`.
    - `GET /api/v1/imagescan/<fileName>` → `{ labels, roomMaterial, roomSize }`.
    - `GET /api/v1/videoscanstart/<fileName>` → `{ jobId }`.
    - `GET /api/v1/videoscanresults/<jobId>` → `{ labels, room_material?, room_size? }`.
  - If you change these endpoints or response shapes, update the thunk actions accordingly.

By keeping the commands and the backend/frontend contracts above in sync, future Warp agents can quickly modify either side of the system without having to rediscover the overall architecture.
