import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

import { H2 } from '../lib';
import ImageCard from './ImageCard'

const files = (() => {
    const URL = "https://s3.amazonaws.com/soundscape-generator-photos/examples/";
    const exampleFiles = [
        {type: "IMG", fileName: "ship.jpg", name: 'Ship'}, 
        {type: "IMG", fileName: "party.jpg", name: 'Party Scene'},
        {type: "IMG", fileName: "concert.jpeg", name: 'Concert'},
        {type: "IMG", fileName: "hockey.jpg", name: 'Hockey Game'},
        {type: "VID", fileName: "big_buck_bunny.mp4", name: 'Bunny Video'}
    ];
    return exampleFiles.map( file => {
        return {
            ...file,
            url: URL + file.fileName
        }
    });
})();

const ExamplesContainer = styled.div`
    margin-top: 1rem;
    margin: 1rem;
`


export default class Examples extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <ExamplesContainer xs={12}>
                <H2 mb>Examples</H2>
                <Row>
                    {files.map( file => (
                        <Col xs={6} sm={4} md={3}>
                            <ImageCard name={file.name} src={file.url} isVideo={file.type === 'VID'} />
                        </Col>
                    ))}
                </Row>
            </ExamplesContainer>
        )
    }
}