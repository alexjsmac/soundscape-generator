import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexa';

import PlayAllButton from '../player/PlayAllButton';
import Media from './Media'
import RoomSettings from "./RoomSettings";
import Results from './Results';

const MediaPageContainer = Row.extend`
    min-height: 100vh;
`

const MediaBlock = Col.extend`
    display: flex;
    flex-direction: column;
    position: relative;
`


class PlayerPage extends Component {
    static propTypes = {
        mediaSource: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
    }
    
    render() {
        const { mediaSource, mediaType } = this.props;
        return (
            <MediaPageContainer flexDirection='column'>
                <MediaBlock flex="0 1 40vh" >
                    <Media src={mediaSource} type={mediaType}/>
                    <PlayAllButton />
                </MediaBlock>
                <Col flex="0 1 15vh">
                    <RoomSettings />
                </Col>
                <Col flex="0 1 40vh">
                    <Results />
                </Col>
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