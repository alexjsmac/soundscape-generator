import React from "react";
import { useDispatch } from "react-redux";
import { mediaActions } from "../../core/media";
import MediaExamples from "./MediaExamples";
import MediaUploader from "./MediaUploader";

const MediaSelection = () => {
  const dispatch = useDispatch();

  const startScan = (fileName, url) => {
    dispatch(
      mediaActions.setMedia({
        source: url,
        fileName: fileName,
      })
    );
    dispatch(mediaActions.startScan(fileName));
  };

  return (
    <div>
      <MediaUploader />
      <MediaExamples onSelect={startScan} />
    </div>
  );
};

export default MediaSelection;
