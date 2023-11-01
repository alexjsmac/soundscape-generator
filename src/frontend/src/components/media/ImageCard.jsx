import React from "react";
import styled from "styled-components";
import { CardAction } from "../lib";

const Image = styled.div`
  width: 100%;
  height: 6rem;
  overflow: hidden;
  background-image: url(${(props) => props["data-source"]});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Video = styled.video`
  width: 100%;
  height: 6rem;
  margin: auto;
`;

export default ({ name, src, isVideo, onClick }) => (
  <CardAction onClick={onClick}>
    {isVideo ? <Video src={src}></Video> : <Image data-source={src}></Image>}
    <div className="flex justify-between p-2">
      <h3 className="font-semibold text-xs">{name}</h3>
      {/* {(isVideo) ? (
          <Videocam size={12}/>
      ) : (
          <PhotoCamera size={12}/>
      )} */}
    </div>
  </CardAction>
);
