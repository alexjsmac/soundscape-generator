import { generalActions } from '../general';

// import {
//     IMAGE_UPLOAD_START,
//     IMAGE_UPLOAD_SUCCESS
// } from './action-types';


export function uploadImage(file) {
    return function (dispatch) {
        console.log("starting upload");
        const formData = new FormData();
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            body: formData,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        };

        console.log("START POST");
        fetch("/api/v1/upload", requestOptions)
            .then((response) => {
                console.log("POST RESPONSE", response)
                return response.json()
            })
            .then((json) => {
                console.log("POST SUCCESS", json);
                const result = json || getFakeResponse();
                dispatch(generalActions.setKeywords(result))
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