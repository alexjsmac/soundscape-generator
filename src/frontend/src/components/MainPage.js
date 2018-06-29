import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MEDIA_SELECTION, MEDIA_PLAYER } from '../core/app'

import styled from 'styled-components'
import { Row, Col } from 'react-flexa';
import { Desktop, Mobile } from './lib'
import MediaSelection from './media/MediaSelection';
import PlayerPage from './player/PlayerPage';
import Topbar from './TopBar'

import './main-page-styles.css';

const AppContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`

const DesktopContainer = Row.extend`
  height: 100%;
`

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
      <AppContainer>
        <Topbar />
        <Desktop>
          <DesktopContainer>
            <Col xs={6}>
              <MediaSelection />
            </Col>
            <Col xs={6}>
              <PlayerPage />
            </Col>
          </DesktopContainer>
        </Desktop>
        <Mobile>
          {renderScreen(screen)}
        </Mobile>

        
        {/* <div className="main-container">
          <div className="results-container">
            <Results />
          </div>
        </div> */}
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screen: state.app.screen
  }
}
export default connect(mapStateToProps, null)(MainPage);
