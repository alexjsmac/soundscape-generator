import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mediaTypes } from '../../core/media/mediaTypes'

import { Row, Col } from 'react-flexa';
import { H2, Mobile, CardBorderGrid } from '../lib'

import Media from './Media'
import PlayAllButton from '../player/PlayAllButton';
import BackButton from './BackButton'
import RoomSettings from "./RoomSettings";
import AddLabelForm from './AddLabelForm'
import Results from './Results';


const MediaPageContainer = Row.extend`
    height: 100%;
    max-height: 100%;
    overflow: hidden;
`

const MediaBlock = Col.extend`
    display: flex;
    flex-direction: column;
    position: relative;
`

const ResultsBlock = Col.extend`
    flex: 1 1 100px;
    overflow: scroll;
`

const AudioHeadingBlock = Row.extend`
    padding: 0.5rem 0.5rem 0;
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
            >
                <MediaBlock flex="0 1 20vh" gutter="0" >
                    <Media src={mediaSource} type={mediaType}/>
                    <PlayAllButton />
                    <Mobile>
                        <BackButton />
                    </Mobile>
                </MediaBlock>
                <Col  gutter="0">
                    <CardBorderGrid>
                        <RoomSettings />
                    </CardBorderGrid>
                    <CardBorderGrid>
                        <AudioHeadingBlock>
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
                    </CardBorderGrid>
                </Col>
                <ResultsBlock>
                    <Results />
                </ResultsBlock>
            </MediaPageContainer>
        )
    }
}

const mapStateToProps = (state) => {
    const results = state.general.keywords.reduce( (result, keyword) => {
        result.push({
            name: keyword,
            sound: state.sounds[keyword] ? state.sounds[keyword] : false
        });
        return result;
    }, [])
    return {
        mediaSource: state.media.source,
        mediaType: state.media.type,
        results: results
    }
}

export default connect(mapStateToProps, null)(PlayerPage);