import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { connect } from "react-redux";
import { generalActions } from "../../core/general";

import { Button } from "antd";
import { Row, Col } from "../lib";
import AudioPlayerProvider from "./AudioPlayer/AudioPlayerProvider";
import {
  AudioName,
  PlayButton,
  ShuffleButton,
  VolumeSlider,
  PanSlider,
} from "./AudioPlayer/AudioPlayerComponents";

const InnerRow = styled(Row)`
  padding: 0 0.5rem;
  padding-top: ${(props) => (props.pt ? props.pt : "")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "")};
`;

const Seperator = styled.div`
  height: 1px;
  width: 100%;
  margin: 0.05rem 0.5rem 0;
  border-bottom: ${(props) => `1px solid #bbb `};
`;

const SoundContainer = styled.div`
  padding: 0rem 0 1rem;
`;

class Result extends Component {
  static propTypes = {
    keyword: PropTypes.string.isRequired,
    sounds: PropTypes.object.isRequired,
  };

  render() {
    const { keyword, sounds, deleteKeyword } = this.props;
    const sound = sounds[keyword];

    const hasSound = typeof sound !== "undefined";
    const isLoading = hasSound ? !!sound.isLoading : true;
    const isError = hasSound ? !!sound.hasNoResults : false;

    const TopSection = (
      <>
        <div className="flex gap-2 justify-between m-2">
          <span className="font-bold truncate">{keyword}</span>
          {!isLoading && !isError && <ShuffleButton />}
          <Button size="small" onClick={() => deleteKeyword(keyword)}>
            Delete
          </Button>
        </div>
        <Seperator />
      </>
    );

    const SoundSection = (
      <SoundContainer>
        <div className="flex items-center p-2">
          <PlayButton />
          <AudioName />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <VolumeSlider />
          <PanSlider />
        </div>
      </SoundContainer>
    );

    const AudioSectionWrap = ({ children }) => (
      <SoundContainer style={{ height: "100%" }}>
        <InnerRow
          justifyContent="center"
          alignItems="center"
          style={{ height: "50%" }}
        >
          {children}
        </InnerRow>
      </SoundContainer>
    );

    if (isLoading) {
      return (
        <div className="box-shadow-border">
          {TopSection}
          <AudioSectionWrap>
            {/* loading icon */}
            Loading
          </AudioSectionWrap>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="box-shadow-border">
          {TopSection}
          <AudioSectionWrap>
            <b>No Sounds Found</b>
          </AudioSectionWrap>
        </div>
      );
    }

    if (!hasSound) {
      return "";
    }

    return (
      <div className="box-shadow-border">
        <AudioPlayerProvider keyword={keyword} sound={sound}>
          {TopSection}
          {SoundSection}
        </AudioPlayerProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sounds: state.sounds,
});

export default connect(mapStateToProps, generalActions)(Result);
