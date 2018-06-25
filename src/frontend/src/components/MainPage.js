import React, { Component } from 'react';
// import Results from './Results';
import MediaSection from './media/MediaSection';
// import Header from './common/Header'
import Topbar from './TopBar'

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Topbar />
        <MediaSection />

        
        <div className="main-container">
          <div className="">
            {/* <Header title="Media Selection" desc="Upload an image, video or choose from one of the examples below."/> */}
            
          </div>
          {/* <div className="results-container">
            <Results />
          </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
