import {combineReducers} from 'redux';
import { mediaReducer } from '../media';
import { audioReducer } from '../audio';
import { generalReducer } from '../general';
import { soundsReducer } from '../sounds';

const rootReducer = combineReducers({
  media: mediaReducer,
  audio: audioReducer,
  general: generalReducer,
  sounds: soundsReducer
});

export default rootReducer;
