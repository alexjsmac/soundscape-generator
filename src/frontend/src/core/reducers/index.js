import {combineReducers} from 'redux';
import { imageReducer } from '../image';
import { audioReducer } from '../audio';
import { generalReducer } from '../general';
import { soundsReducer } from '../sounds';

const rootReducer = combineReducers({
  image: imageReducer,
  audio: audioReducer,
  general: generalReducer,
  sounds: soundsReducer
});

export default rootReducer;
