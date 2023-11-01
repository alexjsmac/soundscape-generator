import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MEDIA_SELECTION, MEDIA_PLAYER } from "../core/app";
import { Desktop, Mobile, H2 } from "./lib";
import MediaSelection from "./media/MediaSelection";
import PlayerPage from "./player/PlayerPage";
import Topbar from "./TopBar";

import "./main-page-styles.css";

class MainPage extends Component {
  static propTypes = {
    screen: PropTypes.string.isRequired,
  };

  render() {
    const { screen } = this.props;

    const Welcome = () => (
      <div className="my-4 mt-8">
        <H2>Welcome!</H2>
        <p>
          This is an application that allows users to upload their photos and
          easily create captivating soundscapes with the help of some friendly
          AI and audio clips.
        </p>
      </div>
    );

    return (
      <div className="h-screen max-h-screen overflow-y-hidden bg-gray-50">
        <Topbar />
        <Desktop>
          <div className="h-full max-w-[1200px] m-auto">
            <div className="h-full grid grid-cols-2">
              <div className="px-4">
                <Welcome />
                <MediaSelection />
              </div>
              <div className="h-full">
                <PlayerPage />
              </div>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div className="h-full max-w-[600px] m-auto flex-col p-2">
            {screen === MEDIA_SELECTION && (
              <>
                <Welcome />
                <MediaSelection />
              </>
            )}
            {screen === MEDIA_PLAYER && <PlayerPage />}
          </div>
        </Mobile>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screen: state.app.screen,
  };
};
export default connect(mapStateToProps, null)(MainPage);
