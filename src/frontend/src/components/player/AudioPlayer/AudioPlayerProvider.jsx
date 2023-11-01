import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { soundActions } from '../../../core/sounds';
import webAudioUtil from '../../../audio/webAudioUtil';

import AudioPlayerContext from './AudioPlayerContext'

class AudioPlayerProvider extends Component {
    static propTypes = {
        keyword: PropTypes.string.isRequired,
        sound: PropTypes.object.isRequired,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            sourcePosition: {
                x: 0,
                y: 0.5,
                z: 0.5
            },
            gain: 1
        }

    }

    setupAudioElement = () => {
        const { keyword, stopSound, sound } = this.props;
        const soundObj = sound.sound;
        
        const newSource = soundObj.previews["preview-hq-mp3"];
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

    componentDidUpdate = () => {
        const { sourcePosition, gain } = this.state;
        const { sound } = this.props;
        const { isPlaying } = sound;

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

    togglePlay = () => {
        const {playSound, stopSound, keyword, sound} = this.props;
        const { isPlaying } = sound;
        if (isPlaying) {
            stopSound(keyword);
        } else {
            playSound(keyword);
        }
    }

    shuffle = () => {
        const {stopSound, getSoundForKeyword, keyword} = this.props
        stopSound(keyword);
        getSoundForKeyword(keyword);
    }

    setGain = (targetValue) => {
        const value = parseFloat(targetValue)
        this.setState({gain: value});
    }

    updateSourcePosition = (targetValue) => {
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
        const { sourcePosition, gain} = this.state;
        const { keyword, sound } = this.props;
        const isPlaying = sound.isPlaying;
        const soundObj = sound.sound;
        
        const context = {
            sourcePosition,
            keyword,
            gain,
            name: soundObj.name,
            isPlaying: isPlaying,
            togglePlay: this.togglePlay,
            updateSourcePosition: this.updateSourcePosition,
            setGain: this.setGain,
            shuffle: this.shuffle
        }

        return (
            <AudioPlayerContext.Provider value={context}>
                {this.props.children}
            </AudioPlayerContext.Provider>
        )
    }
}

export default connect(null, soundActions)(AudioPlayerProvider);
