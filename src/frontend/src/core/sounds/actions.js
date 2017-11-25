import {
    SOUNDS_GET_ALL,
    SOUND_GET_SUCCESS,
    SOUND_DELETE
} from './action-types';

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

export function getAllSounds(file) {
    return function (dispatch, getState) {
        const { keywords } = getState().general

        // for each keyword, perform a fetch, and then dispatch an action to update the sound
        keywords.forEach(keyword => {
            getSoundSearchResult(keyword)
                .then(getSound)
                .then((sound) => {
                    dispatch(getSoundSuccess(keyword, sound))
                })
        })

    }
}

function getSoundSearchResult(keyword) {
    const url = `https://freesound.org/apiv2/search/text/?query=${keyword}`
    let headers = new Headers();
    headers.append("Authorization", "Token FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9");
    return fetch(url, {headers})
        .then((response) => response.json())
        .then((json) => json.results[0])
        .catch((err) => {
            console.error("ERROR", err);
            throw new Error(err);
        });
}

function getSound(soundInfo) {
    if (!soundInfo) return;
    const url = `https://freesound.org/apiv2/sounds/${soundInfo.id}/`
    let headers = new Headers();
    headers.append("Authorization", "Token FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9");
    return fetch(url, {headers})
        .then((response) => response.json())
        .catch((err) => {
            console.error("ERROR", err);
        });
}
