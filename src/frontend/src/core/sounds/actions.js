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
    return {
        type: SOUND_STOP,
        keyword
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
            getSoundSearchResults(keyword)
                .then(soundList => {
                    dispatch(setSoundList(keyword, soundList))
                    dispatch(getNextSound(keyword));
                })
        })
    }
}

export function getNextSound(keyword) {
    return function (dispatch, getState) {
        const sound = getState().sounds[keyword];
        getSoundFromList(keyword, sound)
            .then(sound => {
                dispatch(getSoundSuccess(keyword, sound))
            })
    }
}


function getSoundFromList(keyword, sound) {
    const id = sound.soundList[sound.soundChoice + 1].id
    if (!id) return;
    const url = `https://freesound.org/apiv2/sounds/${id}/`
    let headers = new Headers();
    headers.append("Authorization", "Token FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9");
    return fetch(url, {headers})
        .then((response) => response.json())
        .catch((err) => {
            console.error("ERROR", err);
        });
}


function getSoundSearchResults(keyword) {
    const url = `https://freesound.org/apiv2/search/text/?query=${keyword}`
    let headers = new Headers();
    headers.append("Authorization", "Token FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9");
    return fetch(url, {headers})
        .then((response) => response.json())
        .then(json => json.results)
        .catch((err) => {
            console.error("ERROR", err);
            throw new Error(err);
        });
}
