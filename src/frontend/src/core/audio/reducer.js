import {
    AUDIO_PLAY
} from './action-types';


export function audioReducer(state = {}, action) {
    switch (action.type) {
        case AUDIO_PLAY:
            return {
                completed: true,
                success: true
            };
        default:
            return state;
    }
}