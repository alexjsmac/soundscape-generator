import {
    SET_ROOM_SIZE
} from './action-types';
import {getRoomSize} from './room-settings'

const defaultState = {
    roomSize: getRoomSize("small")
}

export function audioReducer(state = {}, action) {
    switch (action.type) {
        case SET_ROOM_SIZE:
            return {
                ...state,
                roomSize: getRoomSize(action.size)
            };
        default:
            return state;
    }
}