import React, { Component } from 'react';
import Results from './Results';
import ImageUploader from './common/ImageUploader';
import RoomSettings from './audio/RoomSettings';

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
          <div className="main-container">
            <div className="upload-container">
              <ImageUploader />
            </div>
            <div className="results-container">
              <Results />
            </div>
          </div>
          
          <div className="settings-container">
            <RoomSettings />
          </div>
      </div>
    );
  }
}

export default MainPage;
