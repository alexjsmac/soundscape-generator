import {
    KEYWORDS_SET,
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

export function deleteKeyword(keyword) {
    return function(dispatch) {
        dispatch(soundActions.stopSound(keyword));
        dispatch({type: KEYWORD_DELETE, keyword});
        dispatch(soundActions.deleteSound(keyword));
    }
}
  
export function addKeyword(keyword) {
    return {
        type: KEYWORD_ADD,
        keyword
    }
}
  