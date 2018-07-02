import {
    KEYWORDS_SET,
    KEYWORDS_CLEAR,
    KEYWORD_DELETE,
    KEYWORD_ADD
} from './action-types';
import { soundActions } from '../sounds';
  
export function setKeywords(keywords) {
    return {
        type: KEYWORDS_SET,
        keywords
    }
}

export function clearKeywords() {
    return {
        type: KEYWORDS_CLEAR
    }
}

export function addKeyword(keyword) {
    return {
        type: KEYWORD_ADD,
        keyword
    }
}

export function deleteKeyword(keyword) {
    return function(dispatch) {
        dispatch(soundActions.stopSound(keyword));
        dispatch({type: KEYWORD_DELETE, keyword});
        dispatch(soundActions.deleteSound(keyword));
    }
}