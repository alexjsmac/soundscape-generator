import { SET_ROOM_SIZE, SET_ROOM_TYPE } from "./action-types";
import {
  roomSizes,
  getRoomDimensions,
  roomTypes,
  getRoomMaterials,
} from "./room-settings";

const defaultState = {
  roomSize: roomSizes.SMALL,
  roomDimensions: getRoomDimensions(roomSizes.SMALL),
  roomType: roomTypes.OUTSIDE,
  roomMaterials: getRoomMaterials(roomTypes.OUTSIDE),
};

export function audioReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ROOM_SIZE:
      return {
        ...state,
        roomSize: action.roomSize,
        roomDimensions: getRoomDimensions(action.roomSize),
      };
    case SET_ROOM_TYPE:
      return {
        ...state,
        roomType: action.roomType,
        roomMaterials: getRoomMaterials(action.roomType),
      };
    default:
      return state;
  }
}
