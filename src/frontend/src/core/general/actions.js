import {
    KEYWORDS_SET,
    KEYWORD_DELETE,
    KEYWORD_ADD
} from './action-types';
  
export function setKeywords(keywords) {
    return {
        type: KEYWORDS_SET,
        keywords
    }
}

export function deleteKeyword(keyword) {
    return {
        type: KEYWORD_DELETE,
        keyword
    }
}
  
export function addKeyword(keyword) {
    return {
        type: KEYWORD_ADD,
        keyword
    }
}
  