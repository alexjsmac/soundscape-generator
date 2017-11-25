import {
    KEYWORDS_SET,
    KEYWORD_DELETE,
    KEYWORD_ADD
} from './action-types';

const defaultState = {
    keywords: ["waves", "seagulls", "sea coast", "wind"]
}

export function generalReducer(state = defaultState, action) {
    switch (action.type) {
        case KEYWORDS_SET:
            return {
                keywords: action.keywords
            };
        case KEYWORD_DELETE:
            return {
                keywords: state.keywords.filter((keyword) => keyword !== action.keyword)
            }
        case KEYWORD_ADD:
            return {
                keywords: [...state.keywords, action.keyword]
            }
        default:
            return state;
    }
}
