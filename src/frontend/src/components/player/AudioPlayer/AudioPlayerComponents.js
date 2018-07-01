import React from 'react';
import styled from 'styled-components';

import { withAudioPlayerContext } from './AudioPlayerContext'
import { Icon, Slider } from 'antd'

const Name = styled.div`
    padding-left: 0;
    flex: 0 1 120px;
    align-self: center;
    font-size: 12px;
    max-width: 120px;
`

const PlayerButton = styled.button`
    display: block;
    padding-left: 0px;
    padding-right: 10px;
    border: 0px solid white;
    border-radius: 6px;
    background: none;
    cursor: pointer;
`

const Label = styled.label`
    flex: 0 1 150px;
`

export const AudioName = withAudioPlayerContext(({context}) => (
    <Name>{context.name}</Name>
))

export const PlayButton = withAudioPlayerContext(({context}) => (
    <PlayerButton onClick={context.togglePlay}>
        {(context.isPlaying) ? <Icon type="pause-circle" /> : <Icon type="play-circle" />}
        {context.isPlaying.toString()}
    </PlayerButton>
));

export const ShuffleButton = withAudioPlayerContext(({context}) => (
    <PlayerButton onClick={context.shuffle}>
        Shuffle
    </PlayerButton>
));

export const VolumeSlider = withAudioPlayerContext(({context}) => (
    <Label htmlFor="x">
            Volume
            <Slider 
                value={context.gain}
                name="gain"
                min={0.001}
                max={1}
                step={0.001}
                onChange={context.setGain} 
            />
    </Label>
))

export const PanSlider = withAudioPlayerContext(({context}) => (
    <Label htmlFor="x">
        Pan
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