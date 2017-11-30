import React, { Component } from 'react';
import Results from './Results';
import ImageList from './image/ImageList';
import ImageUploader from './image/ImageUploader';
import LoadingState from './image/LoadingState';
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
            <ImageList />
            <ImageUploader />
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
