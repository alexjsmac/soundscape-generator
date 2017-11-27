import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';
import webAudioUtil from '../../audio/webAudioUtil';
import { Icon } from 'antd';
import './audio-player-styles.css';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourcePosition: {
                x: 0,
                y: 0.5,
                z: 0.5
            },
            keyword: props.keyword
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.updateSourcePosition = this.updateSourcePosition.bind(this);
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
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {
        const {sourcePosition, keyword} = this.state;
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
        const {stopSound, getNextSound, keyword} = this.props
        stopSound(keyword);
        getNextSound(keyword);
    }

    updateSourcePosition(e) {
        e.preventDefault();
        const target = e.target;
        const value = parseFloat(target.value)
        this.setState({
            ...this.state,
            sourcePosition: {
                ...this.state.sourcePosition,
                [target.name]: value
            }
        })
    }

    render() {
        const { sourcePosition, keyword} = this.state;
        const { isPlaying } = this.props.sounds[keyword];
        const { name } = this.props;
        return (
            <div className="audio-player">
                <button onClick={this.togglePlay} className="play-button">
                    {(isPlaying) ? <Icon type="pause-circle" /> : <Icon type="play-circle" />}
                </button>
                <button onClick={this.shuffle} className="play-button">
                    Shuffle
                </button>
                <div className="audio-name">{name}</div>
                <label htmlFor="x">
                    Pan
                    <input type="range" 
                        value={sourcePosition.x}
                        name="x"
                        min={-1}
                        max={1}
                        step={0.001}
                        onChange={this.updateSourcePosition} />
                </label>
                <label htmlFor="x">
                    Volume
                    <input type="range" 
                        value={sourcePosition.x}
                        name="x"
                        min={-1}
                        max={1}
                        step={0.001}
                        onChange={this.updateSourcePosition} />
                </label>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        sounds: state.sounds
    }
}

export default connect(mapStateToProps, soundActions)(AudioPlayer);
