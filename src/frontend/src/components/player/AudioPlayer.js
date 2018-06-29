import React, { Component } from 'react';
import styled from 'styled-components'
import { Icon, Slider } from 'antd';

import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';
import webAudioUtil from '../../audio/webAudioUtil';


const Container = styled.div`
    display: flex;
`

const Name = styled.div`
    padding-left: 0;
    flex: 0 1 120px;
    align-self: center;
    font-size: 12px;
    max-width: 120px;
`

const PlayButton = styled.button`
    display: inline-block;
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

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword,
            sourcePosition: {
                x: 0,
                y: 0.5,
                z: 0.5
            },
            gain: 1
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.updateSourcePosition = this.updateSourcePosition.bind(this);
        this.setGain = this.setGain.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }

    setupAudioElement() {
        const { keyword, stopSound} = this.props; 
        const sound = this.props.sounds[keyword].sound;
        const newSource = sound.previews["preview-hq-mp3"];
        if (!this.audioElement || this.audioElement.src !== newSource) {
            // Create an AudioElement.
            this.audioElement = document.createElement('audio');
            this.audioElement.crossOrigin = "anonymous";
            this.audioElement.src = newSource
            this.audioElement.addEventListener("ended", () => {
                stopSound(keyword);
            });

            this.source = webAudioUtil.createAudioSource(this.audioElement);
        }

    }

    componentDidMount() {
        const { keyword, shouldPlay, playSound} = this.props; 
        this.setupAudioElement();
        if (shouldPlay) {
            this.audioElement.play();
            playSound(keyword);
        }
    }

    componentWillUnMount() {
        console.log("component will unmount")
        //TODO: dispose audio element + resonance audio source
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }

    componentDidUpdate() {
        const { keyword, sourcePosition, gain } = this.state;
        const {isPlaying} = this.props.sounds[keyword];

        //play/pause
        if (isPlaying) {
            this.audioElement.play();
        } else {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }

        // resonance
        this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
        this.source.setGain(gain);

        // audio source
        // this.audioElement.crossOrigin = "anonymous";
        this.setupAudioElement();
    }

    togglePlay() {
        const {playSound, stopSound, keyword} = this.props;
        const {isPlaying} = this.props.sounds[keyword];
        if (isPlaying) {
            stopSound(keyword);
        } else {
            playSound(keyword);
        }
    }

    shuffle() {
        const {stopSound, getSoundForKeyword, keyword} = this.props
        stopSound(keyword);
        getSoundForKeyword(keyword);
    }

    setGain(targetValue) {
        const value = parseFloat(targetValue)
        this.setState({gain: value});
    }

    updateSourcePosition(targetValue) {
        const value = parseFloat(targetValue)
        this.setState({
            ...this.state,
            sourcePosition: {
                ...this.state.sourcePosition,
                x: value
            }
        })
    }

    render() {
        const { sourcePosition, keyword, gain} = this.state;
        const { isPlaying } = this.props.sounds[keyword];
        const { name } = this.props;
        return (
            <Container>
                <PlayButton onClick={this.togglePlay}>
                    {(isPlaying) ? <Icon type="pause-circle" /> : <Icon type="play-circle" />}
                </PlayButton>
                <PlayButton onClick={this.shuffle}>
                    Shuffle
                </PlayButton>
                <Name>{name}</Name>
                <Label htmlFor="x">
                    Pan
                    <Slider 
                        value={sourcePosition.x}
                        name="x"
                        min={-1}
                        max={1}
                        step={0.001}
                        onChange={this.updateSourcePosition}
                    />
                </Label>
                <Label htmlFor="x">
                    Volume
                    <Slider 
                        value={gain}
                        name="gain"
                        min={0.001}
                        max={1}
                        step={0.001}
                        onChange={this.setGain} 
                    />
                </Label>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        sounds: state.sounds
    }
}

export default connect(mapStateToProps, soundActions)(AudioPlayer);
