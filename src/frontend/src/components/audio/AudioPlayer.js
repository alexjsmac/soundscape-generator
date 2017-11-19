import React, { Component } from 'react';
import WithWebAudio from '../../audioProvider/WithWebAudio'
import start from '../../media/Start.wav'

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.handleControlChange = this.handleControlChange.bind(this);
    }

    componentDidMount() {
        const {audioContext, resonanceAudioScene} = this.props.appAudio
        // Create an AudioElement.
        let audioElement = document.createElement('audio');
        audioElement.src = start;

        // Generate a MediaElementSource from the AudioElement.
        let audioElementSource = audioContext.createMediaElementSource(audioElement);
        // connect as Resonance audio source
        let source = resonanceAudioScene.createSource();
        audioElementSource.connect(source.input);

        // Set the source position relative to the room center (source default position).
        source.setPosition();
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
        const { appAudio } = this.props
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
        console.log(this.props);
        const { roomDimensions, sourcePosition } = this.props.appAudio.state;
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

export default WithWebAudio(AudioPlayer);
