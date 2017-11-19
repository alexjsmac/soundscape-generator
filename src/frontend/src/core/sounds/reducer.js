import {
    SOUNDS_GET_ALL,
    SOUND_GET_SUCCESS,
    SOUND_DELETE
} from './action-types';

const defaultState = {}

export function soundsReducer(state = defaultState, action) {
    switch (action.type) {
        case SOUNDS_GET_ALL:
            return state;
        case SOUND_GET_SUCCESS:
            console.log("get sound success")
            return {
                ...state,
                [action.keyword]: action.sound
            };
        case SOUND_DELETE:
            const newState = {...state};
            delete newState[action.keyword];
            return newState;
        default:
            return state;
    }
}