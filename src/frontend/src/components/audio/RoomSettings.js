import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayAllButton from './PlayAllButton';
import { audioActions } from '../../core/audio';
import { roomSizes, roomTypes } from '../../core/audio/room-settings';
import './room-settings-styles.css';
import { Select } from 'antd';
const Option = Select.Option;

class RoomSettings extends Component {
    constructor(props) {
        super(props);
        this.selectRoomSize = this.selectRoomSize.bind(this);
        this.selectRoomType = this.selectRoomType.bind(this);
    }
    
    // handle control updates
    selectRoomSize(value) {
        this.props.setRoomSize(value);
    }

    // handle control updates
    selectRoomType(value) {
        this.props.setRoomType(value);
    }

    render() {
        const { roomSize, roomType } = this.props
        const capitalize = (a) => a.charAt(0) + a.slice(1).toLowerCase();

        return (
            <div className="env-settings-container">
                <div className="audio-settings-header">
                    <h2>Global Audio Settings</h2>
                    
                </div>
                <div className="audio-options">
                    <PlayAllButton/>
                    <div>
                        <div>
                            <label htmlFor="room-size">Room Size: </label>
                            <Select id="room-size"value={roomSize} onChange={this.selectRoomSize}>
                                {Object.keys(roomSizes).map(RS => (
                                    <Option value={RS} key={RS}>
                                        {capitalize(RS)}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="room-materials">Room Materials: </label>
                            <Select id="room-materials" value={roomType} onChange={this.selectRoomType}>
                                {Object.keys(roomTypes).map(RT => (
                                    <Option value={RT} key={RT}>
                                        {capitalize(RT)}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
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





                