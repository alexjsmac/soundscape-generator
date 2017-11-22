import {
    SET_ROOM_SIZE,
    SET_ROOM_TYPE
} from './action-types';

export function setRoomSize(roomSize) {
    return {
        type: SET_ROOM_SIZE,
        roomSize
    }
}

export function setRoomType(roomType) {
    return {
        type: SET_ROOM_TYPE,
        roomType
    }
}
  