import {
    MEDIA_SET_URL,
    MEDIA_UPLOAD_START,
    MEDIA_UPLOAD_COMPLETE,
    IMAGE_SCAN_START,
    IMAGE_SCAN_COMPLETE,
    VIDEO_SCAN_START,
    VIDEO_SCAN_COMPLETE
} from './action-types';

const defaultState = {
    source: "",
    type: "",
    isUploading: false,
    isScanning: false
}

export function mediaReducer(state = defaultState, action) {
    switch (action.type) {
        case MEDIA_SET_URL:
            return {
                ...state,
                source: action.source,
                type: action.mediaType
            }
        case MEDIA_UPLOAD_START:
            return {...state, isUploading: true}
        case MEDIA_UPLOAD_COMPLETE:
            return {...state, isUploading: false}
        case IMAGE_SCAN_START:
            return {...state, isScanning: true}
        case IMAGE_SCAN_COMPLETE:
            return {...state, isScanning: false}
        case VIDEO_SCAN_START:
            return {...state, isScanning: true}
        case VIDEO_SCAN_COMPLETE:
            return {...state, isScanning: false}
        default:
            return state;
    }
}