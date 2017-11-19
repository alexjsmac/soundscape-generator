import React, { Component } from 'react';
import start from '../../media/Start.wav'

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
        this.handleControlChange = this.handleControlChange.bind(this);
    }
    componentWillMount() {
        // problem with ResonanceAudio webpack build...so just adding script to index.html for now
        const ResonanceAudio = window.ResonanceAudio;
        const {sourcePosition, roomDimensions, roomMaterials} = this.state;

        this.audioContext = new AudioContext();
        this.resonanceAudioScene = new ResonanceAudio(this.audioContext);
        this.resonanceAudioScene.output.connect(this.audioContext.destination);
        this.resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);
        
        // Create an AudioElement.
        let audioElement = document.createElement('audio');

        // Load an audio file into the AudioElement.
        audioElement.src = start;

        // Generate a MediaElementSource from the AudioElement.
        let audioElementSource = this.audioContext.createMediaElementSource(audioElement);
        
        // Add the MediaElementSource to the scene as an audio input source.
        let source = this.resonanceAudioScene.createSource();
        audioElementSource.connect(source.input);

        // Set the source position relative to the room center (source default position).
        source.setPosition(sourcePosition);
        this.source = source;

        audioElement.play();
    }

    componentWillUnMount() {
        this.audioContext.close();
    }

    componentDidUpdate() {
        const {sourcePosition, roomDimensions, roomMaterials} = this.state;
        this.resonanceAudioScene.setRoomProperties(roomDimensions, this.roomMaterials);
        this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z)
    }
    
    // handle control updates
    handleControlChange(e) {
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
                    onChange={this.handleControlChange} />
                <input type="range" 
                    value={sourcePosition.x}
                    data-target="sourcePosition"
                    name="x"
                    min={-1}
                    max={1}
                    step={0.001}
                    onChange={this.handleControlChange} />
            </div>
        );
    }
}

export default AudioPlayer;
