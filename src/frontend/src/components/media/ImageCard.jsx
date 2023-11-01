import React from "react";
import styled from "styled-components";
import { CardAction } from "../lib";
import { Row, Col } from "../lib";

const Image = styled.div`
  width: 100%;
  height: 6rem;
  overflow: hidden;
  background-image: url(${(props) => props.source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Video = styled.video`
  width: 100%;
  height: 6rem;
  margin: auto;
`;

const CardInfo = styled(Row)`
  padding: 0.4rem 0.3rem;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSize.small};
`;

export default ({ name, src, isVideo, onClick }) => (
  <CardAction mb onClick={onClick}>
    {isVideo ? <Video src={src}></Video> : <Image source={src}></Image>}
    <CardInfo justifyContent="space-between">
      <Col>
        <CardTitle>{name}</CardTitle>
      </Col>
      <Col>
        {/* {(isVideo) ? (
                    <Videocam size={12}/>
                ) : (
                    <PhotoCamera size={12}/>
                )} */}
      </Col>
    </CardInfo>
  </CardAction>
);
