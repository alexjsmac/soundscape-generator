import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mediaTypes } from "../../core/media/mediaTypes";
import { H2, Mobile } from "../lib";

import Media from "./Media";
import PlayAllButton from "../player/PlayAllButton";
import BackButton from "./BackButton";
import RoomSettings from "./RoomSettings";
import AddLabelForm from "./AddLabelForm";
import Results from "./Results";

class PlayerPage extends Component {
  static propTypes = {
    mediaSource: PropTypes.string.isRequired,
    mediaType: PropTypes.string.isRequired,
  };

  render() {
    const { mediaSource, mediaType } = this.props;
    return (
      <div className="h-full h-max-screen">
        {mediaSource && (
          <div className="flex flex-col relative flex-grow-0 flex-shrink-1 flex-basis-[20vh] h-[20vh]">
            <Media src={mediaSource} type={mediaType} />
            <Mobile>
              <BackButton />
            </Mobile>
          </div>
        )}
        <div className="border box-shadow-border">
          <div className="grid grid-cols-2 p-2">
            <div>
              <H2>Audio Clips</H2>
              <p className="text-xs">
                Here are the generated labels for this
                {mediaType === mediaTypes.VIDEO && " video"}
                {mediaType === mediaTypes.IMAGE && " image"}
              </p>
            </div>
            <AddLabelForm />
          </div>
          <div className="grid grid-cols-3 gap-4 m-2">
            <div className="flex items-center">
              <PlayAllButton />
            </div>
            <RoomSettings />
          </div>
        </div>
        <div className="h-max-full grid grid-cols-2 overflow-y-scroll">
          <Results />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mediaSource: state.media.source,
    mediaType: state.media.type,
  };
};

export default connect(mapStateToProps, null)(PlayerPage);
