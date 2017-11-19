import React, { Component } from 'react';
import WithWebAudio from '../../audioProvider/WithWebAudio'

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.handleControlChange = this.handleControlChange.bind(this);
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
        console.log(this.props);
        const { isPlaying } = this.state;
        const { roomDimensions, sourcePosition } = this.props.appAudio.state;
        return (
            <div>
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





                