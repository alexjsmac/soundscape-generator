import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MEDIA_SELECTION, MEDIA_PLAYER } from '../core/app'

import MediaSelection from './media/MediaSelection';
import PlayerPage from './player/PlayerPage';
import Topbar from './TopBar'

import './main-page-styles.css';

class MainPage extends Component {
  static propTypes = {
    screen: PropTypes.string.isRequired
  }
  
  render() {
    const { screen } = this.props;
    const renderScreen = (screen) => {
      switch (screen) {
        case MEDIA_SELECTION:
          return <MediaSelection />
        case MEDIA_PLAYER:
          return <PlayerPage />
        default:
          return ""
      }
    }
    return (
      <div className="main-page">
        <Topbar />
        {renderScreen(screen)}

        
        {/* <div className="main-container">
          <div className="results-container">
            <Results />
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screen: state.app.screen
  }
}
export default connect(mapStateToProps, null)(MainPage);
