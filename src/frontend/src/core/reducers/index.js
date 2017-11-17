import {combineReducers} from 'redux';
import { imageReducer } from '../image';
import { audioReducer } from '../audio';
import { generalReducer } from '../general';

const rootReducer = combineReducers({
  image: imageReducer,
  audio: audioReducer,
  general: generalReducer
});

export default rootReducer;
