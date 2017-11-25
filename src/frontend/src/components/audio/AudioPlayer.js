import React, { Component } from 'react';
import webAudioUtil from '../../audio/webAudioUtil';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            sourcePosition: {
                x: 0.7,
                y: 0.5,
                z: 0.5
            }
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.updateSourcePosition = this.updateSourcePosition.bind(this);
    }

    componentDidMount() {
        const { src, shouldPlay } = this.props;

        // Create an AudioElement.
        let audioElement = document.createElement('audio');
        audioElement.crossOrigin = "anonymous";
        audioElement.src = src;
        audioElement.addEventListener("ended", () => {
            this.setState({isPlaying: false})
        });

        this.source = webAudioUtil.createAudioSource(audioElement);
        if (shouldPlay) {
            audioElement.play();
            this.setState({isPlaying: true})
        }
        this.audioElement = audioElement;
    }

    componentWillUnMount() {
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {
        const {sourcePosition} = this.state;
        this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
    }

    togglePlay() {
        if (this.state.isPlaying) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.setState({isPlaying: false})
        } else {
            this.audioElement.play();
            this.setState({isPlaying: true})
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
        const { isPlaying, sourcePosition} = this.state;
        return (
            <div>
                <button onClick={this.togglePlay}>{(isPlaying) ?"Pause":"Play"}</button>
                <input type="range" 
                    value={sourcePosition.x}
                    name="x"
                    min={-1}
                    max={1}
                    step={0.001}
                    onChange={this.updateSourcePosition} />
            </div>
        );
    }
}

export default AudioPlayer;
