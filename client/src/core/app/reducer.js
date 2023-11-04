import {
  TO_MEDIA_PLAYER,
  TO_MEDIA_SELECTION,
  MEDIA_SELECTION,
} from "./constants";

const defaultState = {
  screen: MEDIA_SELECTION,
};

export function appReducer(state = defaultState, action) {
  switch (action.type) {
    case TO_MEDIA_PLAYER:
      return {
        ...state,
        screen: action.screen,
      };
    case TO_MEDIA_SELECTION:
      return {
        ...state,
        screen: action.screen,
      };
    default:
      return state;
  }
}
