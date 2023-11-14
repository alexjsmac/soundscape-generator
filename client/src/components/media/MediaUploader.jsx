import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Upload } from "antd";
import styled from "styled-components";
import { mediaActions } from "../../core/media";
import { Card, H2 } from "../lib";

const Dragger = Upload.Dragger;

const MediaUploadContainer = styled(Card)`
  margin: 1rem 0;
`;

const MediaUploader = () => {
  const dispatch = useDispatch();

  const handleImageChange = useCallback(
    (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          mediaActions.setMedia({
            source: reader.result,
            fileName: file.name,
          })
        );
      };
      reader.readAsDataURL(file);
      dispatch(mediaActions.uploadMedia(file));
    },
    [dispatch]
  );

  const uploaderProps = {
    beforeUpload: (file) => {
      handleImageChange(file);
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
            <span className="text-center font-bold">Upload Media Here</span>
          </div>
        </div>
      </Dragger>
    </MediaUploadContainer>
  );
};

export default MediaUploader;
