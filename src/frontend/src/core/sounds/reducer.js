import {
  SOUND_SET_SOUNDLIST,
  SOUNDS_CLEAR_ALL,
  SOUND_GET,
  SOUND_GET_SUCCESS,
  SOUND_GET_ERROR,
  SOUND_DELETE,
  SOUND_PLAY,
  SOUND_STOP,
  SOUNDS_PLAY_ALL,
  SOUNDS_STOP_ALL,
} from "./action-types";

const defaultState = {};

const defaultSound = {
  sound: {},
  soundList: [],
  soundChoice: 0,
  isPlaying: false,
  isLoading: false,
  hasNoResults: false,
};

export function soundsReducer(state = defaultState, action) {
  let newState;
  switch (action.type) {
    case SOUND_SET_SOUNDLIST:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          isLoading: true,
          soundList: action.soundList,
          soundChoice: 0,
        },
      };
    case SOUNDS_CLEAR_ALL:
      return defaultState;
    case SOUND_GET:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          isLoading: true,
        },
      };
    case SOUND_GET_SUCCESS:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          sound: { ...action.sound },
          isLoading: false,
          soundChoice:
            state[action.keyword].soundChoice + 1 >=
            state[action.keyword].soundList.length
              ? 0
              : ++state[action.keyword].soundChoice,
        },
      };
    case SOUND_GET_ERROR:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          isLoading: false,
          hasNoResults: true,
        },
      };
    case SOUND_DELETE:
      newState = { ...state };
      delete newState[action.keyword];
      return newState;
    case SOUND_PLAY:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          isPlaying: true,
        },
      };
    case SOUND_STOP:
      return {
        ...state,
        [action.keyword]: {
          ...defaultSound,
          ...state[action.keyword],
          isPlaying: false,
        },
      };
    case SOUNDS_PLAY_ALL:
      newState = { ...state };
      Object.entries(newState).forEach((entry) => {
        entry[1].isPlaying = true;
      });
      return newState;
    case SOUNDS_STOP_ALL:
      newState = { ...state };
      Object.entries(newState).forEach((entry) => {
        entry[1].isPlaying = false;
      });
      return newState;
    default:
      return state;
  }
}
