import { generalActions } from '../general';

// import {
//     IMAGE_UPLOAD_START,
//     IMAGE_UPLOAD_SUCCESS
// } from './action-types';


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
            .then(function(response) {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                } else {
                    var error = new Error(response.statusText || response.status)
                    error.response = response
                    return Promise.reject(error)
                }
            })
            .then((response) => {
                console.log("POST RESPONSE", response)
                return response.json()
            })
            .then((json) => {
                console.log("POST SUCCESS", json);
                
                // TODO: make another request here for image analysis
                const keywords = getFakeResponse();
                dispatch(generalActions.setKeywords(keywords))
            })
            .catch((err) => {
                console.error("POST ERROR", err);
                const result = getFakeResponse();
                dispatch(generalActions.setKeywords(result))
            });

        function getFakeResponse() {
            return [
                "default", "keywords", "sea coast", "wind", "whales"
            ];
        }
    }
}