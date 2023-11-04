import React from "react";
import styled from "styled-components";
import { Slider } from "antd";
import classNames from "classnames";

import { withAudioPlayerContext } from "./AudioPlayerContext";
import { Pause, Play, Shuffle } from "lucide-react";

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
  <button
    shape="circle"
    onClick={context.togglePlay}
    className={classNames(
      "p-2 rounded-full flex justify-center mr-2 hover:text-blue-600",
      {
        "text-gray-500 bg-gray-100 hover:bg-blue-200": !context.isPlaying,
        "text-blue-700 bg-blue-100": context.isPlaying,
      }
    )}
  >
    {context.isPlaying ? (
      <Pause size={16} strokeWidth={2} />
    ) : (
      <Play size={16} strokeWidth={2} absoluteStrokeWidth />
    )}
  </button>
));

export const ShuffleButton = withAudioPlayerContext(({ context }) => (
  <ShuffleLink
    onClick={context.shuffle}
    className="text-xs flex gap-2 items-center justify-self-end"
  >
    <Shuffle size={14} />
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
