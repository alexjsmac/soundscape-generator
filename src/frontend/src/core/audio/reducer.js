import {
    SET_ROOM_SIZE
} from './action-types';
import {getRoomDimensions, roomTypes} from './room-settings'

const defaultState = {
    roomSize: "small",
    roomDimensions: getRoomDimensions("small"),
    roomType: roomTypes.TRANSPARENT,
    roomMaterials: {
        left: 'brick-bare',
        right: 'curtain-heavy',
        front: 'marble',
        back: 'glass-thin',
        down: 'grass',
        up: 'transparent',
    },
}

export function audioReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ROOM_SIZE:
            return {
                ...state,
                roomSize: action.roomSize,
                roomDimensions: getRoomDimensions(action.roomSize)
            };
        default:
            return state;
    }
}