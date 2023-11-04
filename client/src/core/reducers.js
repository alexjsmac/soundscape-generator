import { combineReducers } from "redux";
import { mediaReducer } from "./media";
import { audioReducer } from "./audio";
import { generalReducer } from "./general";
import { soundsReducer } from "./sounds";
import { appReducer } from "./app";

const rootReducer = combineReducers({
  media: mediaReducer,
  audio: audioReducer,
  general: generalReducer,
  sounds: soundsReducer,
  app: appReducer,
});

export default rootReducer;
