import React, { Component } from "react";
import { connect } from "react-redux";
import { mediaActions } from "../../core/media";

import { Upload } from "antd";
import styled from "styled-components";
import { Card, H2, Row, Col } from "../lib";

const Dragger = Upload.Dragger;

const MediaUploadContainer = styled(Card)`
  margin: 1rem 0;
`;

const InfoHolder = styled.div`
  padding: 1rem;
  text-align: left;
`;

const IconSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CTAMessage = styled.span`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
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
          <Row padding="1rem">
            <Col xs={8}>
              <InfoHolder>
                <H2>Your Soundscape</H2>
                <p>
                  Upload your photo or video here to generate an audio
                  soundscape.
                </p>
              </InfoHolder>
            </Col>
            <Col xs={3}>
              <IconSection>
                {/* <FileIcon /> */}
                <CTAMessage>Upload Media Here</CTAMessage>
              </IconSection>
            </Col>
          </Row>
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
