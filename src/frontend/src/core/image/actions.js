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
            .then(checkResponse)
            .then((response) => response.json())
            .then((json) => {
                console.log("IMAGE SUCCESS", json);

                fetch(`/api/v1/scan/${json.fileName}`)
                    .then(checkResponse)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("SCAN SUCCESS", json);
                        dispatch(generalActions.setKeywords(json))
                    })
                    .catch((err) => {
                        console.error("SCAN ERROR", err);
                        const result = getFakeResponse();
                        dispatch(generalActions.setKeywords(result))
                    });
            })
            .catch((err) => {
                console.error("IMAGE ERROR", err);
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


function checkResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    }
}