import React from "react";
import styled from "styled-components";

import { withAudioPlayerContext } from "./AudioPlayerContext";
import { Button, Slider } from "antd";

const Label = styled.label`
  display: block;
  position: relative;
`;

const LabelName = styled.span`
  display: block;
  position: relative;
  left: 6px;
  top: 6px;
  font-weight: bold;
`;

const ShuffleLink = styled.button`
  font-weight: bold;
  color: ${(props) => props.theme.color.secondary};
`;

export const AudioName = withAudioPlayerContext(({ context }) => (
  <span className="text-sm truncate">{context.name}</span>
));

export const PlayButton = withAudioPlayerContext(({ context }) => (
  <Button
    shape="circle"
    // icon={context.isPlaying ? "pause" : "caret-right"}
    onClick={context.togglePlay}
    style={{
      marginRight: "0.5rem",
    }}
  />
));

export const ShuffleButton = withAudioPlayerContext(({ context }) => (
  <ShuffleLink onClick={context.shuffle} className="text-sm">
    {/* <Icon type="swap" /> */}
    Shuffle
  </ShuffleLink>
));

export const VolumeSlider = withAudioPlayerContext(({ context }) => (
  <Label htmlFor="x">
    <LabelName>Volume</LabelName>
    <Slider
      value={context.gain}
      name="gain"
      min={0.001}
      max={1}
      step={0.001}
      onChange={context.setGain}
    />
  </Label>
));

export const PanSlider = withAudioPlayerContext(({ context }) => (
  <Label htmlFor="x">
    <LabelName>Pan</LabelName>
    <Slider
      value={context.sourcePosition.x}
      name="x"
      min={-1}
      max={1}
      step={0.001}
      onChange={context.updateSourcePosition}
    />
  </Label>
));
