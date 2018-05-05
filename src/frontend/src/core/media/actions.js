import { generalActions } from '../general';
import { mediaTypes, getMediaType } from '../../utils/formats';
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
    VIDEO_SCAN_RESULTS: "/api/v1/videoscanresults/"
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
export function mediaScanStart() {
    return {type: VIDEO_SCAN_START}
}
export function mediaScanComplete() {
    return {type: VIDEO_SCAN_COMPLETE}
}

export function setMedia(data) {
    return function(dispatch) {
        const mediaType = getMediaType(data.fileName);
        dispatch({
            type: MEDIA_SET_URL,
            source: data.source,
            mediaType
        });
        if (mediaType === mediaTypes.IMAGE) {
            dispatch(scanImage(data.fileName));
        } else if(mediaType === mediaTypes.VIDEO) {
            dispatch(scanVideoStart(data.fileName));
        }
    }
}

export function uploadMedia(file) {
    return function (dispatch) {
        dispatch(mediaUploadStart());
        const formData = new FormData();
        formData.append('image', file);

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        get(BASE_URL + ENDPOINTS.UPLOAD, requestOptions)
            .then((json) => {
                console.log("IMAGE SUCCESS", json);
                dispatch(mediaUploadComplete());
                dispatch(scanImage(json.fileName));
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
                dispatch(mediaScanComplete());
            })
            .catch((err) => {
                console.error("SCAN ERROR", err);
                dispatch(mediaScanComplete());
            });
    }
}

// start the process of scanning a video
// this will return a job id that we can query later
function scanVideoStart(fileName) {
    return function(dispatch) {
        dispatch(mediaScanStart());
        get(BASE_URL + ENDPOINTS.VIDEO_SCAN_START(fileName))
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

// attempt to get the list of tags for a video
// this may return an empty array and we'll need to keep waiting
export function getVideoResults(fileName) {
    return function(dispatch) {
        dispatch(mediaScanStart());
        get(BASE_URL + ENDPOINTS.VIDEO_SCAN_START(fileName))
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


function get(url) {
    return fetch(url)
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
