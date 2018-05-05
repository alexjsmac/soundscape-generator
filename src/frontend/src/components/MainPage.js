import React, { Component } from 'react';
import Results from './Results';
import MediaList from './media/MediaList';
import MediaUploader from './media/MediaUploader';
import LoadingState from './media/LoadingState';
import Header from './common/Header'

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="topbar">
          <h1>Soundscape Generator</h1>
        </div>
        
        <div className="main-container">
          <div className="upload-container">
            <Header title="Image Selection" desc="Upload an image or choose from one of the examples below."/>
            <MediaList />
            <MediaUploader />
            <LoadingState />
          </div>
          <div className="results-container">
            <Results />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
