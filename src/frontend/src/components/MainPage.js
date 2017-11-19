import React, { Component } from 'react';
import Results from './Results';
import ImageUploader from './common/ImageUploader';
import AudioPlayer from './audio/AudioPlayer';
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
            Settings Area Nov 19 - 1
          </div>
      </div>
    );
  }
}

export default MainPage;
