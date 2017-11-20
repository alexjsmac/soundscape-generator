import {
    SET_ROOM_SIZE
} from './action-types';
import {getRoomSize} from './room-settings'


export function setRoomSize(size) {
    return {
        type: SET_ROOM_SIZE,
        size: getRoomSize(size)
    }
}
  