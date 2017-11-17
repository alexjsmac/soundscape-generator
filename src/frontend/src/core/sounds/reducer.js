import {
    SOUNDS_GET_ALL,
    SOUNDS_GET_SUCCESS
} from './action-types';

const defaultState = {
    sounds: []
}

export function soundReducer(state = defaultState, action) {
    switch (action.type) {
        case SOUNDS_GET_ALL:
            console.log("reducer", action)
            return state;
        case SOUNDS_GET_SUCCESS:
            console.log()
        default:
            return state;
    }
}