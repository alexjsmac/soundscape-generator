import React, { Component } from 'react';
import { connect } from 'react-redux';
import { audioActions } from '../../core/audio';

class RoomSettings extends Component {
    constructor(props) {
        super(props);
        this.selectRoomSize = this.selectRoomSize.bind(this);
    }
    
    // handle control updates
    selectRoomSize(e) {
        e.preventDefault();
        this.props.setRoomSize(e.target.value);
    }

    render() {
        console.log(this.props);
        const { roomSize, roomType } = this.props
        console.log(roomSize, roomType);
        // TODO move resonance audio state into REDUX
        // Then we can render the state of that here, and fire off actions to change it
        return (
            <div>
                <div>Room Size: {roomSize}</div>
                <select value={roomSize} onChange={this.selectRoomSize}>
                    <option value="small">small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="huge">Huge</option>
                </select>
                <div>Room Type: {roomType}</div>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    return{
        roomSize: state.audio.roomSize,
        roomType: state.audio.roomType
    }
}

export default connect(mapStateToProps, audioActions)(RoomSettings);





                