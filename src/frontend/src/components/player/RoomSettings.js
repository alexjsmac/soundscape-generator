import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { audioActions } from '../../core/audio';
import { roomSizes, roomTypes } from '../../core/audio/room-settings';

import styled from 'styled-components'
import { Row, Col } from 'react-flexa';
import { Select } from 'antd';

const Option = Select.Option;

const Container = styled.div`
    width: 100%;
    background: #f5f5f5;    
    padding: 12px;
    border-top: 1px solid #222;
`

const Label = styled.label`
    font-weight: 700;
    padding-right: 4px;
`

class RoomSettings extends Component {
    static propTypes = {
        setRoomSize: PropTypes.func.isRequired,
        setRoomType: PropTypes.func.isRequired,
        roomSize: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
    }
    
    selectRoomSize = (value)=> {
        this.props.setRoomSize(value);
    }

    selectRoomType = (value) => {
        this.props.setRoomType(value);
    }

    render() {
        const { roomSize, roomType } = this.props
        const capitalize = (a) => a.charAt(0) + a.slice(1).toLowerCase();

        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Label htmlFor="room-size">Room Size: </Label>
                        <Select id="room-size" value={roomSize} onChange={this.selectRoomSize}>
                            {Object.keys(roomSizes).map(RS => (
                                <Option value={RS} key={RS}>
                                    {capitalize(RS)}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col  xs={6}>
                        <Label htmlFor="room-materials">Room Materials: </Label>
                        <Select id="room-materials" value={roomType} onChange={this.selectRoomType}>
                            {Object.keys(roomTypes).map(RT => (
                                <Option value={RT} key={RT}>
                                    {capitalize(RT)}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </Container>
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





                