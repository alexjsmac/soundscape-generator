import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../../core/general';
import styled from 'styled-components';
import { Button } from 'antd'
import AudioPlayer from './AudioPlayer';

const Container = styled.div`
    width: 100%;
    margin: 1px 0;
    background: white;
    overflow: hidden;
`

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
`

const Keyword = styled.span`
    font-weight: 700;
`

const Sound = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    background: #f5f5f5;
    /* color: white; */
    font-size: 10px;
`


class Result extends Component {
    render() {
        const { keyword, sound, deleteKeyword } = this.props;
        const soundObj = sound.sound;
        const remove = () => {
            deleteKeyword(keyword);
        }

        const renderSound = (sound, keyword) => (
            <Sound>
                <AudioPlayer sound={sound} name={sound.name} keyword={keyword} />
            </Sound>
        )

        return (
            <Container>
                <TopBar>
                    <Keyword>{keyword}</Keyword>
                    <Button type="danger" shape="circle" icon="close" onClick={remove}/>
                </TopBar>
                {(soundObj) ? renderSound(soundObj, keyword) : ""}
            </Container>
        );
    }
}

export default connect(null, generalActions)(Result);