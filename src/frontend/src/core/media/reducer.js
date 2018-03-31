import {
    MEDIA_SET_URL,
    MEDIA_UPLOAD_START,
    MEDIA_UPLOAD_COMPLETE,
    MEDIA_SCAN_START,
    MEDIA_SCAN_COMPLETE
} from './action-types';

const defaultState = {
    url: "",
    isUploading: false,
    isScanning: false
}

export function mediaReducer(state = defaultState, action) {
    switch (action.type) {
        case MEDIA_SET_URL:
            return {
                ...state,
                url: action.url
            }
        case MEDIA_UPLOAD_START:
            return {...state, isUploading: true}
        case MEDIA_UPLOAD_COMPLETE:
            return {...state, isUploading: false}
        case MEDIA_SCAN_START:
            return {...state, isScanning: true}
        case MEDIA_SCAN_COMPLETE:
            return {...state, isScanning: false}
        default:
            return state;
    }
}