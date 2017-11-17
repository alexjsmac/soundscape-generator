import React, { Component } from 'react';
import Keywords from './Keywords';
import ImageUploader from './common/ImageUploader';
import AudioPlayer from './audio/AudioPlayer';
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
              <Keywords />
            </div>
          </div>
          
          <AudioPlayer />
          <div className="settings-container">
            Settings Area
          </div>
      </div>
    );
  }
}

export default MainPage;
