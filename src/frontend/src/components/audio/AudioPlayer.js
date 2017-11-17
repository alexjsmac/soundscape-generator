import React, { Component } from 'react';
import waterfront from '../../media/Start.wav'

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomDimensions: {
                width: 3.1,
                height: 2.5,
                depth: 3.4
            },
            roomMaterials: {
                left: 'brick-bare',
                right: 'curtain-heavy',
                front: 'marble',
                back: 'glass-thin',
                down: 'grass',
                up: 'transparent',
            },
            sourcePosition: {
                x: -0.707,
                y: -0.707,
                z: 0
            },
            listenerPosition: {
                x: -0.707,
                y: -0.707,
                z: 0
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        const ResonanceAudio = window.ResonanceAudio;
        this.audioContext = new AudioContext();
        this.resonanceAudioScene = new ResonanceAudio(this.audioContext);
        this.resonanceAudioScene.output.connect(this.audioContext.destination);
        this.resonanceAudioScene.setRoomProperties(this.state.roomDimensions, this.roomMaterials);
        // Create an AudioElement.
        let audioElement = document.createElement('audio');

        // Load an audio file into the AudioElement.
        audioElement.src = waterfront;

        // Generate a MediaElementSource from the AudioElement.
        let audioElementSource = this.audioContext.createMediaElementSource(audioElement);
        
        // Add the MediaElementSource to the scene as an audio input source.
        let source = this.resonanceAudioScene.createSource();
        audioElementSource.connect(source.input);

        // Set the source position relative to the room center (source default position).
        source.setPosition(this.state.sourcePosition);
        this.source = source;

        audioElement.play();
    }
    componentWillUnMount() {
        this.audioContext.close();
    }

    componentDidUpdate() {
        const {sourcePosition} = this.state;
        this.resonanceAudioScene.setRoomProperties(this.state.roomDimensions, this.roomMaterials);
        this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z)
    }
    
    handleChange(e) {
        e.preventDefault();
        const target = e.target;
        const dataTarget = target.dataset.target;
        console.log(dataTarget)
        const inputValue = parseFloat(target.value)
        this.setState({
            ...this.state,
            [dataTarget]: {
                ...this.state[dataTarget],
                [target.name]: inputValue
            }
        })
    }

    render() {
        const { roomDimensions, sourcePosition } = this.state;
        return (
            <div>
                <span>Audio Context</span>
                <input type="number" 
                    value={roomDimensions.width}
                    data-target="roomDimensions"
                    name="width"
                    min={0.001}
                    onChange={this.handleChange} />
                <input type="range" 
                    value={sourcePosition.x}
                    data-target="sourcePosition"
                    name="x"
                    min={-1}
                    max={1}
                    step={0.001}
                    onChange={this.handleChange} />
            </div>
        );
    }
}

export default AudioPlayer;
