import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { soundActions } from '../../core/sounds';

import { Row, Col } from 'react-flexa';
import PlayAllButton from '../player/PlayAllButton';
import Media from './Media'
import RoomSettings from "./RoomSettings";
import Results from './Results';
import AddLabelForm from './AddLabelForm'
import { Button } from 'antd'
import { H2 } from '../lib'

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


class PlayerPage extends Component {
    static propTypes = {
        mediaSource: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
    }
    
    render() {
        const { mediaSource, mediaType, getAllSounds } = this.props;
        return (
            <MediaPageContainer flexDirection='column'>
                <MediaBlock flex="0 1 40vh" >
                    <Media src={mediaSource} type={mediaType}/>
                    <PlayAllButton />
                </MediaBlock>
                <Col flex="0 1 15vh">
                    <RoomSettings />
                    <Row>
                        <Col xs={6}>
                            <H2>Results</H2>
                            <p>List of lables for the image, click Get Sounds to populate audio</p>
                        </Col>  
                        <Col  xs={6}>
                            <Button
                                type="primary"
                                onClick={getAllSounds}
                            >
                                Get Sounds
                            </Button>
                        </Col>
                    </Row>
                    {/* Add a new label */}
                    <Row justifyContent="center" >
                        <Col xs={10}>
                            <AddLabelForm />
                        </Col>
                    </Row>
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


export default connect(
    mapStateToProps,
    soundActions
)(PlayerPage);