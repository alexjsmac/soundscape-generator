import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../core/general";
import { Button } from "antd";
import AudioPlayerProvider from "./AudioPlayer/AudioPlayerProvider";
import {
  AudioName,
  PlayButton,
  ShuffleButton,
  VolumeSlider,
  PanSlider,
} from "./AudioPlayer/AudioPlayerComponents";

const Seperator = styled.div`
  height: 1px;
  width: 100%;
  margin: 0.05rem 0.5rem 0;
  border-bottom: ${(props) => `1px solid #bbb `};
`;

const Result = ({ keyword }) => {
  const dispatch = useDispatch();
  const sounds = useSelector((state) => state.sounds);
  const sound = sounds[keyword];
  const hasSound = typeof sound !== "undefined";
  const isLoading = hasSound ? !!sound.isLoading : true;
  const isError = hasSound ? !!sound.hasNoResults : false;

  const deleteKeyword = (keyword) =>
    dispatch(generalActions.deleteKeyword(keyword));

  const TopSection = (
    <>
      <div className="flex gap-2 justify-between m-2">
        <span className="font-bold truncate">{keyword}</span>
        {!isLoading && !isError && <ShuffleButton />}
        <Button size="small" onClick={() => deleteKeyword(keyword)}>
          Delete
        </Button>
      </div>
      <Seperator />
    </>
  );

  if (isLoading) {
    return (
      <div className="box-shadow-border">
        {TopSection}
        <div className="p-2">
          {/* loading icon */}
          Loading
        </div>
      </div>
    );
  }

  if (isError || !hasSound) {
    return (
      <div className="box-shadow-border">
        {TopSection}
        <span className="py-1 px-2 m-2 rounded inline-block text-xs text-red-800 bg-red-200 font-bold">
          No Sounds Found
        </span>
      </div>
    );
  }

  return (
    <div className="box-shadow-border">
      <AudioPlayerProvider keyword={keyword} sound={sound}>
        {TopSection}
        <div className="pb-1">
          <div className="flex items-center p-2">
            <PlayButton />
            <AudioName />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <VolumeSlider />
            <PanSlider />
          </div>
        </div>
      </AudioPlayerProvider>
    </div>
  );
};

Result.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default Result;
