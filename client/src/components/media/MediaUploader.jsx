import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "antd";
import styled from "styled-components";
import { mediaActions } from "../../core/media";
import { Card, H2 } from "../lib";
import { Loader2, UploadIcon } from "lucide-react";

const MediaUploadContainer = styled(Card)`
  margin: 1rem 0;
`;

const MediaUploader = () => {
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.media.isUploading);
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

  const beforeUpload = (file) => {
    handleImageChange(file);
    return false;
  };

  return (
    <MediaUploadContainer>
      <Upload.Dragger beforeUpload={beforeUpload} showUploadList={false}>
        <div className="grid grid-cols-12 text-left p-2">
          <div className="col-span-7">
            <H2>Your Soundscape</H2>
            <p>
              Upload your photo or video here to generate an audio soundscape.
            </p>
          </div>
          <div className="col-span-5 flex justify-start items-center pl-4">
            {isUploading ? (
              <Loader2 className="animate-spin" size={26} />
            ) : (
              <UploadIcon size={26} />
            )}
            <span className="font-bold pl-2">Upload Media Here</span>
          </div>
        </div>
      </Upload.Dragger>
    </MediaUploadContainer>
  );
};

export default MediaUploader;
