import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import { connect } from 'react-redux';
import { generalActions } from '../../core/general';

import { Button } from 'antd'
import { Row, Col } from '../lib';
import AudioPlayerProvider from './AudioPlayer/AudioPlayerProvider'
import { AudioName, PlayButton, ShuffleButton, VolumeSlider, PanSlider } from "./AudioPlayer/AudioPlayerComponents";

const borderColor = '#aac'
const Container = styled(Col)`
    width: 100%;
    background: white;
    overflow: hidden;
    box-shadow: 1px 0 0 0 ${borderColor}, 
        0 1px 0 0 ${borderColor}, 
        1px 1px 0 0 ${borderColor}, 
        1px 0 0 0 ${borderColor} inset, 
        0 1px 0 0 ${borderColor} inset;
`

const InnerRow = styled(Row)`
    padding: 0 0.5rem;
    padding-top: ${props => props.pt ? props.pt : ""};
    padding-bottom: ${props => props.pb ? props.pb : ""};
`

const Seperator = styled.div`
    height: 1px;
    width: 100%;
    margin: 0.05rem 0.5rem 0;
    border-bottom: ${ props => `1px solid #bbb `};
`

const SoundContainer = styled.div`
    padding: 0rem 0 1rem;
`

const SoundPlayRow = styled(Row)`
    padding: 0.5rem 0 0;
`
const ResultLabel = styled.span`
    font-size: ${ props => props.theme.fontSize.default};
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
        
        const hasSound = typeof sound !== 'undefined';
        const isLoading = (hasSound) ? !!sound.isLoading : true;
        const isError = (hasSound) ? !!sound.hasNoResults : false;

        const DeleteButton = (
            <Button 
                size="small"
                icon="delete"
                onClick={() => deleteKeyword(keyword)}
                style={{
                    margin: 0
                }}
            >
                Delete
            </Button>
        );

        const TopSection = (
            <React.Fragment>
                <InnerRow 
                    justifyContent="space-between" 
                    alignItems="center" 
                    pt="0.5rem" 
                    pb="0.5rem"
                >
                    <Col>
                        <ResultLabel>{keyword}</ResultLabel>
                    </Col>
                    <Col>
                        {DeleteButton}
                    </Col>
                </InnerRow>
                <InnerRow gutter="1rem">
                    <Col>
                        <b>Audio</b>
                    </Col>
                    <Col>
                        { !isLoading && !isError && <ShuffleButton />}
                    </Col>
                    <Seperator />
                </InnerRow>
            </React.Fragment>
        )

        const SoundSection = (
            <SoundContainer>
                <SoundPlayRow gutter="0">
                    <Col>
                        <PlayButton />
                        <AudioName />
                    </Col>
                </SoundPlayRow>
                <InnerRow>
                    <Col xs={6}>
                        <VolumeSlider />
                    </Col>
                    <Col xs={6}>
                        <PanSlider />
                    </Col>
                </InnerRow>
            </SoundContainer>
        )

        const AudioSectionWrap = ({children}) => (
            <SoundContainer style={{height: "100%"}}>
                <InnerRow 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{height: "50%"}}
                >
                    {children}
                </InnerRow>
            </SoundContainer>
        )

        return (
            <Container xs={12} sm={6} gutter="1px">
                    { (isLoading) ? (
                        <React.Fragment>
                            {TopSection}
                            <AudioSectionWrap>
                                {/* <Icon 
                                    type="loading" 
                                    size="large"
                                    style={{ 
                                        fontSize: 16, 
                                        color: '#08c',
                                        padding: '0.5rem'
                                    }}
                                />  */}
                                Loading
                            </AudioSectionWrap>
                        </React.Fragment>
                    ) : ""}
                    { (!isLoading && isError) ? (
                        <React.Fragment>
                            {TopSection}
                            <AudioSectionWrap>
                                <b>No Sounds Found</b>
                            </AudioSectionWrap>
                        </React.Fragment>
                    ) : ""}

                    { (hasSound && !isLoading && !isError) ? (
                        <AudioPlayerProvider keyword={keyword} sound={sound} >
                            {TopSection}
                            {SoundSection}
                        </AudioPlayerProvider>
                    ) : ""}
            </Container>
        )

    }
}

const mapStateToProps = (state) => ({
    sounds: state.sounds
});

export default connect(mapStateToProps, generalActions)(Result);