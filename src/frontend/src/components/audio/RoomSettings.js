import React, { Component } from 'react';
import { connect } from 'react-redux';
import { audioActions } from '../../core/audio';

class RoomSettings extends Component {
    constructor(props) {
        super(props);
        this.handleControlChange = this.handleControlChange.bind(this);
    }
    
    // handle control updates
    handleControlChange(e) {
        e.preventDefault();
    }

    render() {
        console.log(this.props);
        // TODO move resonance audio state into REDUX
        // Then we can render the state of that here, and fire off actions to change it
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

function mapStateToProps(state) {
    return{

    }
}

export default connect(mapStateToProps, audioActions)(RoomSettings);





                