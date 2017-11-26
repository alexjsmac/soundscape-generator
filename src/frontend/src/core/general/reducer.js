import {
    KEYWORDS_SET,
    KEYWORD_DELETE,
    KEYWORD_ADD
} from './action-types';

const defaultState = {
    keywords: [],
    soundResults: {}
}

export function generalReducer(state = defaultState, action) {
    switch (action.type) {
        case KEYWORDS_SET:
            return {
                ...state,
                keywords: action.keywords
            };
        case KEYWORD_DELETE:
            return {
                ...state,
                keywords: state.keywords.filter((keyword) => keyword !== action.keyword)
            }
        case KEYWORD_ADD:
            return {
                ...state,
                keywords: [...state.keywords, action.keyword]
            }
        default:
            return state;
    }
}
