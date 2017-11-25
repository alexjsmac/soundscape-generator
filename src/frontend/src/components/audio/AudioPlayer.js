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
    }

    componentDidMount() {
        const { src, shouldPlay, keyword, stopSound, playSound} = this.props; 
        // Create an AudioElement.
        let audioElement = document.createElement('audio');
        audioElement.crossOrigin = "anonymous";
        audioElement.src = src;
        audioElement.addEventListener("ended", () => {
            stopSound(keyword);
        });

        this.source = webAudioUtil.createAudioSource(audioElement);
        if (shouldPlay) {
            audioElement.play();
            playSound(keyword);
        }
        this.audioElement = audioElement;
    }

    componentWillUnMount() {
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {
        const {sourcePosition, keyword} = this.state;
        const {isPlaying} = this.props.sounds[keyword];
        if (isPlaying) {
            this.audioElement.play();
        } else {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
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
