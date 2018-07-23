import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MEDIA_SELECTION, MEDIA_PLAYER } from '../core/app'

import styled from 'styled-components'
import { Row, Col } from 'react-flexa';
import { Desktop, Mobile, H2, DesktopMaxWidth } from './lib'
import MediaSelection from './media/MediaSelection';
import PlayerPage from './player/PlayerPage';
import Topbar from './TopBar'

import './main-page-styles.css';

const AppContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background: #eee;
`

const ContentColumn = Col.extend`
  background: white;
`

const WelcomeSection = styled.div`
  margin: 2rem 2rem 2rem 0;
  font-size: ${props => props.theme.fontSize.small};
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
          <DesktopMaxWidth>
            <DesktopContainer gutter="0">
              <ContentColumn xs={6} gutter="2rem">
                <WelcomeSection>
                  <H2>Welcome!</H2>
                  <p>This is an application that allows users to upload their photos and easily create captivating soundscapes with the help of some friendly AI and audio clips.</p>
                </WelcomeSection>
                <MediaSelection />
              </ContentColumn>
              <ContentColumn xs={6}>
                <PlayerPage />
              </ContentColumn>
            </DesktopContainer>
          </DesktopMaxWidth>
        </Desktop>
        <Mobile>
          {renderScreen(screen)}
        </Mobile>
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
