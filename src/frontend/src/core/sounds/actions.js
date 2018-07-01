import {
    SOUND_SET_SOUNDLIST,
    SOUNDS_GET_ALL,
    SOUND_GET_SUCCESS,
    SOUND_GET_ERROR,
    SOUND_DELETE,
    SOUND_PLAY,
    SOUND_STOP,
    SOUNDS_PLAY_ALL,
    SOUNDS_STOP_ALL
} from './action-types';


function setSoundList(keyword, soundList) {
    return {
        type: SOUND_SET_SOUNDLIST,
        keyword,
        soundList
    }
}

export function startGetAllSounds() {
    return {
        type: SOUNDS_GET_ALL
    }
}

function getSoundSuccess(keyword, sound) {
    return {
        type: SOUND_GET_SUCCESS,
        keyword,
        sound
    }
}

function getSoundError(keyword, sound) {
    return {
        type: SOUND_GET_ERROR,
        keyword
    }
}

export function deleteSound(keyword) {
    return {
        type: SOUND_DELETE,
        keyword
    }
}

export function playSound(keyword) {
    return {
        type: SOUND_PLAY,
        keyword
    }
}

export function stopSound(keyword) {
    return function(dispatch, getState) {
        if (getState().sounds[keyword]) {
            dispatch({type: SOUND_STOP,keyword})
        }
    }
}

export function playAllSounds() {
    return {
        type: SOUNDS_PLAY_ALL
    }
}
export function stopAllSounds() {
    return {
        type: SOUNDS_STOP_ALL
    }
}

export function getAllSounds() {
    return function (dispatch, getState) {
        const { keywords } = getState().general
        // for each keyword, perform a fetch, and then dispatch an action to update the sound
        keywords.forEach(keyword => {
            freeSoundService.search(keyword)
                .then(soundList => {
                    if (soundList.length) {
                        dispatch(setSoundList(keyword, soundList))   
                        dispatch(getSoundForKeyword(keyword)) 
                    } else {
                        dispatch(getSoundError(keyword));
                    }
                })
                .catch(() => {throw new Error(`Error getting the list of sounds for keyword: ${keyword}`)})
        })
    }
}

export function getSoundForKeyword(keyword) {
    return function (dispatch, getState) {
        const sound = getState().sounds[keyword];
        const id = sound.soundList[sound.soundChoice].id;
        if (!id) return console.error(`No sound for keyword: ${keyword}`);

        freeSoundService.sound(id)
            .then(sound => {
                dispatch(getSoundSuccess(keyword, sound))
            })
            .catch(() => {
                dispatch(getSoundError(keyword));
                throw new Error(`Error getting sound for id: ${id}`)
            })
    }
}

const freeSoundService = (() => {
    const baseURL = `https://freesound.org/apiv2`
    
    let headers = new Headers();
    headers.append("Authorization", "Token FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9");
    const get = (url) => fetch(url, {headers}).then((response) => response.json());
    
    return {
        search: (keyword) => get(`${baseURL}/search/text/?query=${keyword}`)
            .then(res => res.results.map(result => {
                return {id: result.id}
            })),
        sound: (id) => get(`${baseURL}/sounds/${id}/`)
            .then(res =>  {
                return {
                    name: res.name,
                    previews: res.previews
                }
            }),
    }
})()