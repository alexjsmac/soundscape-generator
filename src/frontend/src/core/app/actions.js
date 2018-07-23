import {
    TO_MEDIA_PLAYER,
    TO_MEDIA_SELECTION,
    MEDIA_SELECTION,
    MEDIA_PLAYER
} from './constants';
  
export function toMediaPlayer() {
    return {
        type: TO_MEDIA_PLAYER,
        screen: MEDIA_PLAYER
    }
}

export function toMediaSelection() {
    return {
        type: TO_MEDIA_SELECTION,
        screen: MEDIA_SELECTION
    }
}