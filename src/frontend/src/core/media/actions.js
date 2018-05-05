import { generalActions } from '../general';
import { getMediaType } from '../../utils/formats';
import {
    MEDIA_SET_URL,
    MEDIA_UPLOAD_START,
    MEDIA_UPLOAD_COMPLETE,
    MEDIA_SCAN_START,
    MEDIA_SCAN_COMPLETE
} from './action-types';

const BASE_URL = "http://localhost:8000"
// const BASE_URL = ""
const ENDPOINTS = {
    UPLOAD: "/api/v1/upload",
    IMAGE_SCAN: (fileName) => "/api/v1/imagescan/" + fileName,
    VIDEO_SCAN_START: "/api/v1/videoscanstart/",
    VIDEO_SCAN_RESULTS: "/api/v1/videoscanresults/"
}



export function setMedia(data) {
    return {
        type: MEDIA_SET_URL,
        source: data.source,
        mediaType: getMediaType(data.fileName)
    }
}

export function mediaUploadStart() {
    return {type: MEDIA_UPLOAD_START}
}
export function mediaUploadComplete() {
    return {type: MEDIA_UPLOAD_COMPLETE}
}
export function mediaScanStart() {
    return {type: MEDIA_SCAN_START}
}
export function mediaScanComplete() {
    return {type: MEDIA_SCAN_COMPLETE}
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
        fetch(BASE_URL + ENDPOINTS.UPLOAD, requestOptions)
            .then(checkResponse)
            .then((response) => response.json())
            .then((json) => {
                console.log("IMAGE SUCCESS", json);
                dispatch(mediaUploadComplete());
                dispatch(scanMedia(json.fileName));
            })
            .catch((err) => {
                console.error("IMAGE ERROR", err);
                dispatch(mediaUploadComplete());
            });
    }
}

export function scanMedia(fileName) {
    return function(dispatch) {
        dispatch(mediaScanStart());
        fetch(BASE_URL + ENDPOINTS.IMAGE_SCAN(fileName))
            .then(checkResponse)
            .then((response) => response.json())
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


function checkResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    }
}
