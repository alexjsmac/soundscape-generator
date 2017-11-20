import React, { Component } from 'react';
import WithWebAudio from '../../audioProvider/WithWebAudio'

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
        const { audioContext, resonanceAudioScene } = this.props.appAudio
        // Create an AudioElement.
        let audioElement = document.createElement('audio');
        audioElement.crossOrigin = "anonymous";
        audioElement.src = src;
        audioElement.addEventListener("ended", () => {
            this.setState({isPlaying: false})
        });

        // Generate a MediaElementSource from the AudioElement
        let audioElementSource = audioContext.createMediaElementSource(audioElement);
        
        // connect as Resonance audio source
        let source = resonanceAudioScene.createSource();
        audioElementSource.connect(source.input);

        // Set the source position relative to the room center (source default position).
        source.setPosition();
        if (shouldPlay) {
            audioElement.play();
            this.setState({isPlaying: true})
        }

        this.source = source;
        this.audioElement = audioElement;
    }

    componentWillUnMount() {
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {
        // TODO: sourcePosition can be held in this components state
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
        const { roomDimensions } = this.props.appAudio.state;
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

export default WithWebAudio(AudioPlayer);
