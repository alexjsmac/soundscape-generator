import React, { Component } from "react";
import { connect } from "react-redux";
import { mediaActions } from "../../core/media";

import { Upload } from "antd";
import styled from "styled-components";
import { Card, H2 } from "../lib";

const Dragger = Upload.Dragger;

const MediaUploadContainer = styled(Card)`
  margin: 1rem 0;
`;

class MediaUploader extends Component {
  // When a user chooses a new media source
  handleImageChange(file) {
    const { setMedia } = this.props;
    const reader = new FileReader();
    reader.onloadend = () => {
      setMedia({
        source: reader.result,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
    // Begin upload process
    this.props.uploadMedia(file);
  }

  render() {
    const uploaderProps = {
      beforeUpload: (file) => {
        this.handleImageChange(file);
        return false;
      },
      showUploadList: false,
    };

    return (
      <MediaUploadContainer>
        <Dragger {...uploaderProps}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 p-2 text-left">
              <H2>Your Soundscape</H2>
              <p>
                Upload your photo or video here to generate an audio soundscape.
              </p>
            </div>
            <div className="col-span-3 flex items-center">
              {/* <FileIcon /> */}
              <span className="text-center font-bold">Upload Media Here</span>
            </div>
          </div>
        </Dragger>
      </MediaUploadContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    source: state.media.source,
    type: state.media.type,
  };
}

export default connect(mapStateToProps, mediaActions)(MediaUploader);
