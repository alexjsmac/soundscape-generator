import {
    SOUND_SET_SOUNDLIST,
    SOUNDS_GET_ALL,
    SOUND_GET_SUCCESS,
    SOUND_DELETE,
    SOUND_PLAY,
    SOUND_STOP,
    SOUNDS_PLAY_ALL,
    SOUNDS_STOP_ALL
} from './action-types';

const defaultState = {
    /*
    [keyword]: {
        sound: {freeSound details},
        soundList: [freeSound search results],
        soundChoice: index of choice in soundList,
        isPlaying: true
    }
    */
}

export function soundsReducer(state = defaultState, action) {
    let newState;
    switch (action.type) {
        case SOUND_SET_SOUNDLIST:
            return {
                ...state,
                [action.keyword]: {
                    ...state[action.keyword],
                    soundList: action.soundList,
                    soundChoice: -1
                }
            }
        case SOUNDS_GET_ALL:
            return state;
        case SOUND_GET_SUCCESS:
            return {
                ...state,
                [action.keyword]: {
                    ...state[action.keyword],
                    sound: {...action.sound},
                    soundChoice: ++state[action.keyword].soundChoice
                }
            };
        case SOUND_DELETE:
            newState = {...state};
            delete newState[action.keyword];
            return newState;
        case SOUND_PLAY:
            return {
                ...state,
                [action.keyword]: {
                    ...state[action.keyword],
                    isPlaying: true
                }
            }
        case SOUND_STOP:
            return {
                ...state,
                [action.keyword]: {
                    ...state[action.keyword],
                    isPlaying: false
                }
            }
        case SOUNDS_PLAY_ALL:
            newState = {...state};
            Object.entries(newState).forEach(entry => {
                entry[1].isPlaying = true
            });
            return newState;
        case SOUNDS_STOP_ALL:
            newState = {...state};
            Object.entries(newState).forEach(entry => {
                entry[1].isPlaying = false
            });
            return newState;
        default:
            return state;
    }
}