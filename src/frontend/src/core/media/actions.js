import { generalActions } from '../general';
import { mediaTypes, getMediaType } from './mediaTypes';
import {
    MEDIA_SET_URL,
    MEDIA_UPLOAD_START,
    MEDIA_UPLOAD_COMPLETE,
    IMAGE_SCAN_START,
    IMAGE_SCAN_COMPLETE,
    VIDEO_SCAN_START,
    VIDEO_SCAN_COMPLETE
} from './action-types';

// const BASE_URL = "http://localhost:8000"
const BASE_URL = ""

const ENDPOINTS = {
    UPLOAD: "/api/v1/upload",
    IMAGE_SCAN: (fileName) => "/api/v1/imagescan/" + fileName,
    VIDEO_SCAN_START: (fileName) => "/api/v1/videoscanstart/" + fileName,
    VIDEO_SCAN_RESULTS: (jobId) => "/api/v1/videoscanresults/" + jobId
}

export function mediaUploadStart() {
    return {type: MEDIA_UPLOAD_START}
}
export function mediaUploadComplete() {
    return {type: MEDIA_UPLOAD_COMPLETE}
}
export function imageScanStart() {
    return {type: IMAGE_SCAN_START}
}
export function imageScanComplete() {
    return {type: IMAGE_SCAN_COMPLETE}
}
export function videoScanStart() {
    return {type: VIDEO_SCAN_START}
}
export function videoScanComplete() {
    return {type: VIDEO_SCAN_COMPLETE}
}

function startScan(dispatch, fileName) {
    const mediaType = getMediaType(fileName);
    if (mediaType === mediaTypes.IMAGE) {
        dispatch(scanImage(fileName));
    } else if(mediaType === mediaTypes.VIDEO) {
        dispatch(scanVideoStart(fileName));
    }
}

export function setMedia(data) {
    return function(dispatch) {
        const mediaType = getMediaType(data.fileName);
        dispatch({
            type: MEDIA_SET_URL,
            source: data.source,
            mediaType
        });
        startScan(dispatch, data.fileName);
    }
}

export function uploadMedia(file) {
    return function (dispatch) {
        dispatch(mediaUploadStart());
        const formData = new FormData();
        formData.append('image', file);

        post(BASE_URL + ENDPOINTS.UPLOAD, formData)
            .then((json) => {
                console.log("IMAGE SUCCESS", json);
                dispatch(mediaUploadComplete());
                startScan(dispatch, json.fileName);
            })
            .catch((err) => {
                console.error("IMAGE ERROR", err);
                dispatch(mediaUploadComplete());
            });
    }
}

function scanImage(fileName) {
    return function(dispatch) {
        dispatch(imageScanStart());
        get(BASE_URL + ENDPOINTS.IMAGE_SCAN(fileName))
            .then((json) => {
                console.log("SCAN SUCCESS", json);
                dispatch(generalActions.setKeywords(json.labels))
                dispatch(imageScanComplete());
            })
            .catch((err) => {
                console.error("SCAN ERROR", err);
                dispatch(imageScanComplete());
            });
    }
}

// start the process of scanning a video
// this will return a job id that we can query later
function scanVideoStart(fileName) {
    return function(dispatch) {
        dispatch(videoScanStart());
        get(BASE_URL + ENDPOINTS.VIDEO_SCAN_START(fileName))
            .then((json) => {
                const jobId = json.jobId;
                console.log("SCAN SUCCESS", jobId);

                const test = () => {
                    console.log("START");
                    getVideoResults(jobId).then((json) => {
                        const labels = json.labels;
                        console.log(labels);
                        if (labels.length) {
                            console.log("success");
                            dispatch(generalActions.setKeywords(labels))
                            dispatch(videoScanComplete());
                        } else {
                            setTimeout(test, 2000);
                        }
                    })
                };
                test();

            })
            .catch((err) => {
                console.error("SCAN ERROR", err);
                dispatch(videoScanComplete());
            });
    }
}

// attempt to get the list of tags for a video
// this may return an empty array and we'll need to keep waiting
function getVideoResults(jobId) {
    return get(BASE_URL + ENDPOINTS.VIDEO_SCAN_RESULTS(jobId))
        .then((json) => {
            console.log("GET VIDEO RESULTS SUCCESS", json);
            return json;
        })
        .catch((err) => {
            console.error("GET VIDEO RESULTS ERROR", err);
        });
}


function get(url) {
    return fetch(url)
        .then(checkResponse)
        .then((response) => response.json())
}

function post(url, formData) {
    return fetch(url, {
        method: 'POST', body: formData
    })
    .then(checkResponse)
    .then((response) => response.json())
}

function checkResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    }
}
