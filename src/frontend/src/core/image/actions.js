import { generalActions } from '../general';

import {
    IMAGE_SET_URL
} from './action-types';

export function setImageUrl(url) {
    return {
        type: IMAGE_SET_URL,
        url
    }
}


export function uploadImage(file) {
    return function (dispatch) {
        console.log("starting upload");
        const formData = new FormData();
        formData.append('image', file);

        const requestOptions = {
            method: 'POST',
            body: formData
        };

        console.log("START POST");
        fetch("/api/v1/upload", requestOptions)
            .then(checkResponse)
            .then((response) => response.json())
            .then((json) => {
                console.log("IMAGE SUCCESS", json);
                dispatch(scanImage(json.fileName));
            })
            .catch((err) => {
                console.error("IMAGE ERROR", err);
            });
    }
}

export function scanImage(fileName) {
    return function(dispatch) {
        console.log("scanning image", fileName);
        fetch(`/api/v1/scan/${fileName}`)
            .then(checkResponse)
            .then((response) => response.json())
            .then((json) => {
                console.log("SCAN SUCCESS", json);
                dispatch(generalActions.setKeywords(json.labels))
            })
            .catch((err) => {
                console.error("SCAN ERROR", err);
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
