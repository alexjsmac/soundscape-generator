import React, { Component } from 'react';
import { connect } from 'react-redux';
import { audioActions } from '../../core/audio';
import { roomSizes, roomTypes } from '../../core/audio/room-settings';

class RoomSettings extends Component {
    constructor(props) {
        super(props);
        this.selectRoomSize = this.selectRoomSize.bind(this);
        this.selectRoomType = this.selectRoomType.bind(this);
    }
    
    // handle control updates
    selectRoomSize(e) {
        e.preventDefault();
        this.props.setRoomSize(e.target.value);
    }

    // handle control updates
    selectRoomType(e) {
        e.preventDefault();
        this.props.setRoomType(e.target.value);
    }


    render() {
        const { roomSize, roomType } = this.props
        const capitalize = (a) => a.charAt(0) + a.slice(1).toLowerCase();

        return (
            <div>
                <div>Room Size: {roomSize}</div>
                <select value={roomSize} onChange={this.selectRoomSize}>
                    {Object.keys(roomSizes).map(RS => (
                        <option value={RS} key={RS}>
                            {capitalize(RS)}
                        </option>
                    ))}
                </select>
                <div>Room Type: {roomType}</div>
                <select value={roomType} onChange={this.selectRoomType}>
                    {Object.keys(roomTypes).map(RT => (
                        <option value={RT} key={RT}>
                            {capitalize(RT)}
                        </option>
                    ))}
                </select>
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





                