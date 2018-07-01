import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import { connect } from 'react-redux';
import { generalActions } from '../../core/general';

import { Button } from 'antd'
import AudioPlayerProvider from './AudioPlayer/AudioPlayerProvider'
import { AudioName, PlayButton, ShuffleButton, VolumeSlider, PanSlider } from "./AudioPlayer/AudioPlayerComponents";

const Container = styled.div`
    width: 100%;
    margin: 1px 0;
    background: white;
    overflow: hidden;
    margin-bottom: 2px;
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

class Result extends Component {
    static propTypes = {
        keyword: PropTypes.string.isRequired,
        sounds: PropTypes.object.isRequired,
    }
    
    render() {
        const { keyword, sounds, deleteKeyword } = this.props;
        const sound = sounds[keyword];
        
        if (typeof sound === 'undefined' || sound.isLoading) {
            return (
                <div>Loading sound</div>
            )
        }

        if (sound.hasNoResults) {
            return (
                <div>Sound ERROR, no results</div>
            )
        }

        const remove = () => {
            deleteKeyword(keyword);
        }

        return (
            <Container>
                <TopBar>
                    <Keyword>{keyword}</Keyword>
                    <Button type="danger" shape="circle" icon="close" onClick={remove}/>
                </TopBar>
                {/* {(soundObj) ? renderSound(soundObj, keyword) : ""} */}
                <AudioPlayerProvider keyword={keyword} sound={sound} >
                    <VolumeSlider />
                    <PanSlider />
                    <PlayButton />
                    <ShuffleButton />
                    <AudioName />
                </AudioPlayerProvider>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    sounds: state.sounds
})

export default connect(mapStateToProps, generalActions)(Result);