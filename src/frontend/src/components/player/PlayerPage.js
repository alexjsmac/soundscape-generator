import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mediaTypes } from '../../core/media/mediaTypes'

import styled from 'styled-components'
import { Row, Col } from 'react-flexa';
import { H2, Mobile, gridBorder } from '../lib'

import Media from './Media'
import PlayAllButton from '../player/PlayAllButton';
import BackButton from './BackButton'
import RoomSettings from "./RoomSettings";
import AddLabelForm from './AddLabelForm'
import Results from './Results';


const MediaPageContainer = styled(Row)`
    height: 100%;
    overflow: hidden;
    padding-right: 1px;
    padding-bottom: 2.9rem;
    padding-top: -1px;
    margin: 0;
`

const MediaBlock = styled(Col)`
    display: flex;
    flex-direction: column;
    position: relative;
`

const ResultsBlock = styled(Col)`
    flex: 1 1 100px;
    height: 100%;
    overflow-y: scroll;
    ${gridBorder}
`

const AudioBlock = styled.div`
    margin-bottom: 1px;
    ${gridBorder}
`
const AudioHeadingBlock = styled(Row)`
    padding: 0.5rem;
`
const AudioControlsBlock = styled(AudioHeadingBlock)`
    background: rgba(100, 100, 150, 0.15);
`

class PlayerPage extends Component {
    static propTypes = {
        mediaSource: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
    }
    
    render() {
        const { mediaSource, mediaType } = this.props;
        return (
            <MediaPageContainer 
                flexDirection='column' 
                justifyContent='flex-start'
                flexWrap='nowrap'
                gutter="1rem"
            >
                <MediaBlock flex="0 1 20vh" gutter="0" >
                    <Media src={mediaSource} type={mediaType}/>
                    <Mobile>
                        <BackButton />
                    </Mobile>
                </MediaBlock>
                <Col gutter="0">
                    <AudioBlock>
                        <AudioHeadingBlock gutter="0">
                            <Col xs={6}>
                                <H2>Audio Clips</H2>
                                <p>Here are the generated labels for this
                                    {mediaType === mediaTypes.VIDEO && " video"}
                                    {mediaType === mediaTypes.IMAGE && " image"}
                                </p>
                            </Col>
                            <Col xs={6}>
                                <AddLabelForm />
                            </Col>
                        </AudioHeadingBlock>
                        <AudioControlsBlock
                            gutter="0"
                            alignItems='center'
                        >
                            <Col xs={4} gutter='0'>
                                <PlayAllButton />
                            </Col>
                            <RoomSettings />
                        </AudioControlsBlock>
                    </AudioBlock>
                </Col>
                <ResultsBlock gutter="0rem" >
                    <Results />
                </ResultsBlock>

            </MediaPageContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaSource: state.media.source,
        mediaType: state.media.type,
    }
}

export default connect(mapStateToProps, null)(PlayerPage);