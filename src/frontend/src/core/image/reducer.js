import {
    // IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_SUCCESS
} from './action-types';

export function imageReducer(state = {}, action) {
    switch (action.type) {
        case IMAGE_UPLOAD_SUCCESS:
            return {
                completed: true,
                success: true
            };
        default:
            return state;
    }
}