import { generalActions } from '../general';

import {
    IMAGE_SET_URL,
    IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_COMPLETE,
    IMAGE_SCAN_START,
    IMAGE_SCAN_COMPLETE
} from './action-types';

export function setImageUrl(url) {
    return {
        type: IMAGE_SET_URL,
        url
    }
}

export function imageUploadStart() {
    return {type: IMAGE_UPLOAD_START}
}
export function imageUploadComplete() {
    return {type: IMAGE_UPLOAD_COMPLETE}
}
export function imageScanStart() {
    return {type: IMAGE_SCAN_START}
}
export function imageScanComplete() {
    return {type: IMAGE_SCAN_COMPLETE}
}

export function uploadImage(file) {
    return function (dispatch) {
        dispatch(imageUploadStart());
        const formData = new FormData();
        formData.append('image', file);

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch("/api/v1/upload", requestOptions)
            .then(checkResponse)
            .then((response) => response.json())
            .then((json) => {
                console.log("IMAGE SUCCESS", json);
                dispatch(imageUploadComplete());
                dispatch(scanImage(json.fileName));
            })
            .catch((err) => {
                console.error("IMAGE ERROR", err);
                dispatch(imageUploadComplete());
            });
    }
}

export function scanImage(fileName) {
    return function(dispatch) {
        dispatch(imageScanStart());
        fetch(`/api/v1/scan/${fileName}`)
            .then(checkResponse)
            .then((response) => response.json())
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


function checkResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    }
}
