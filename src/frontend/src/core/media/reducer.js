import {
    MEDIA_SET_URL,
    MEDIA_UPLOAD_START,
    MEDIA_UPLOAD_COMPLETE,
    MEDIA_UPLOAD_ERROR,
    IMAGE_SCAN_START,
    IMAGE_SCAN_COMPLETE,
    VIDEO_SCAN_START,
    IMAGE_SCAN_ERROR,
    VIDEO_SCAN_COMPLETE,
    VIDEO_SCAN_ERROR
} from './action-types';

const defaultState = {
    source: "",
    type: "",
    isUploading: false,
    isScanning: false,
    hasError: false
}

export function mediaReducer(state = defaultState, action) {
    switch (action.type) {
        case MEDIA_SET_URL:
            return {
                ...state,
                hasError: false,
                source: action.source,
                type: action.mediaType
            }
        case MEDIA_UPLOAD_START:
            return {...state, isScanning: false, isUploading: true}
        case MEDIA_UPLOAD_COMPLETE:
            return {...state, isUploading: false}
        case MEDIA_UPLOAD_ERROR:
            return {...state, isUploading: false, hasError: true}
        case IMAGE_SCAN_START:
            return {...state, isScanning: true}
        case IMAGE_SCAN_COMPLETE:
            return {...state, isScanning: false}
        case IMAGE_SCAN_ERROR:
            return {...state, isScanning: false, hasError: true}
        case VIDEO_SCAN_START:
            return {...state, isScanning: true}
        case VIDEO_SCAN_COMPLETE:
            return {...state, isScanning: false}
        case VIDEO_SCAN_ERROR:
            return {...state, isScanning: false, hasError: true}
        default:
            return state;
    }
}