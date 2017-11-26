import {
    IMAGE_SET_URL,
    // IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_SUCCESS
} from './action-types';

const defaultState = {
    imageUrl: ""
}

export function imageReducer(state = defaultState, action) {
    switch (action.type) {
        case IMAGE_SET_URL:
            return {
                imageUrl: action.url
            }
        case IMAGE_UPLOAD_SUCCESS:
            return {
                completed: true,
                success: true
            };
        default:
            return state;
    }
}