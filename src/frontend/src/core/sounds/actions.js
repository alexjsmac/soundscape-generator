import {
    SOUNDS_GET_ALL,
    SOUNDS_GET_SUCCESS
} from './action-types';

export function startGetAllSounds() {
    return {
        action: SOUNDS_GET_ALL
    }
}

function getSoundsSuccess(sound) {
    return {
        action: SOUNDS_GET_SUCCESS,
        sound
    }
}

export function getAllSounds(file) {
    return function (dispatch, getState) {
        const { keywords } = getState().general

        // for each keyword, perform a fetch, and then dispatch an action to update the sound
        keywords.map(keyword => {
            const url = `https://freesound.org/apiv2/search/text/?query=${keyword}&token=FTDBgkb5Q3NWqdrtVvNzXNqxIu9TFhj1qrWl2Ue9`
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    const sound = json.results[0];
                    console.log("SUCCESS", sound);
                    dispatch(getSoundsSuccess(sound))
                })
                .catch((err) => {
                    console.error("ERROR", err);
                });
        })

    }
}
  