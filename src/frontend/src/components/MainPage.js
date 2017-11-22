import React, { Component } from 'react';
import Results from './Results';
import ImageUploader from './common/ImageUploader';
import AudioPlayer from './audio/AudioPlayer';
import RoomSettings from './audio/RoomSettings';
import start from '../media/Start.wav'

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
          <div className="main-container">
            <div className="upload-container">
              Upload Photo Here
              <ImageUploader />
              
            </div>
            <div className="results-container">
              <Results />
            </div>
          </div>
          
          <AudioPlayer src={start} shouldPlay/>
          <div className="settings-container">
            <RoomSettings />
          </div>
      </div>
    );
  }
}

export default MainPage;
