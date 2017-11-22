import {
    SET_ROOM_SIZE
} from './action-types';

export function setRoomSize(roomSize) {
    return {
        type: SET_ROOM_SIZE,
        roomSize
    }
}
  