import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexa';

import AudioCard from './AudioCard';
import Media from './Media'
import styled from 'styled-components';

const MediaPageContainer = Row.extend`
    min-height: 100vh;
`

const MediaBlock = Col.extend`
    display: flex;
    flex-direction: column;
    position: relative;
`
const AudioCardBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
`

class PlayerPage extends Component {
    static propTypes = {
        mediaSource: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
    }
    
    render() {
        const { mediaSource, mediaType, results } = this.props;
        return (
            <MediaPageContainer flexDirection='column'>
                <MediaBlock flex="0 1 40vh" >
                    <Media src={mediaSource} type={mediaType}/>
                </MediaBlock>
                <Col flex="0 1 15vh">
                    hey
                </Col>
                <Col flex="0 1 40vh">
                    <AudioCardBlock>
                        {results.map( result => 
                            <AudioCard 
                                name={result.name} 
                            />
                        )}
                    </AudioCardBlock>
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