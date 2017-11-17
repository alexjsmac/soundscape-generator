import {
    KEYWORDS_SET,
    KEYWORD_DELETE,
    KEYWORD_ADD
} from './action-types';

const defaultState = {
    keywords: ["waves", "seagulls", "sea coast", "wind", "whales"]
}

export function generalReducer(state = defaultState, action) {
    switch (action.type) {
        case KEYWORDS_SET:
            console.log("reducer", action)
            return {
                keywords: action.keywords
            };
        case KEYWORD_DELETE:
            console.log("delete keyword", action.keyword);
            return {
                keywords: state.keywords.filter((keyword) => keyword !== action.keyword)
            }
        case KEYWORD_ADD:
            console.log("add keyword", action.keyword);
            return {
                keywords: [...state.keywords, action.keyword]
            }
        default:
            return state;
    }
}