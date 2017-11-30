import {
    IMAGE_SET_URL,
    IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_COMPLETE,
    IMAGE_SCAN_START,
    IMAGE_SCAN_COMPLETE
} from './action-types';

const defaultState = {
    imageUrl: "",
    isUploading: false,
    isScanning: false
}

export function imageReducer(state = defaultState, action) {
    switch (action.type) {
        case IMAGE_SET_URL:
            return {
                ...state,
                imageUrl: action.url
            }
        case IMAGE_UPLOAD_START:
            return {...state, isUploading: true}
        case IMAGE_UPLOAD_COMPLETE:
            return {...state, isUploading: false}
        case IMAGE_SCAN_START:
            return {...state, isScanning: true}
        case IMAGE_SCAN_COMPLETE:
            return {...state, isScanning: false}
        default:
            return state;
    }
}