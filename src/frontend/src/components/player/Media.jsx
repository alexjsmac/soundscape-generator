import React from "react";
import styled from "styled-components";
import { mediaTypes } from "../../core/media/mediaTypes";

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
  background-image: url(${(props) => props.source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  margin: auto;
`;

const Media = ({ src, type }) => {
  return type === mediaTypes.VIDEO ? (
    <Video src={src}></Video>
  ) : (
    <Image data-source={src}></Image>
  );
};

export default Media;
