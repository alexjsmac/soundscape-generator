import React, { Component } from 'react';
import Results from './Results';
import MediaSelection from './media/MediaSelection';
import Topbar from './TopBar'

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Topbar />
        <MediaSelection />

        
        <div className="main-container">
          <div className="results-container">
            <Results />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
