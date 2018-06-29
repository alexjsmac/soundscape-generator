import React, { Component } from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';

import { Row, Col } from 'react-flexa';
import { Button } from 'antd'
import { H2 } from '../lib'
import Result from './Result';
import AddLabelForm from './AddLabelForm'


const Container = styled.div`
    /* width: 100%;
    height: 100%;
    overflow: hidden; */
`


class Results extends Component {

    render() {
        const { keywords, sounds, getAllSounds } = this.props;

        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <H2>Results</H2>
                        <p>List of lables for the image, click Get Sounds to populate audio</p>
                    </Col>  
                    <Col  xs={6}>
                        <Button onClick={getAllSounds}>
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

                <div>
                    {keywords.map((keyword, index) =>
                        <Result keyword={keyword} 
                            sound={(sounds[keyword]) ? sounds[keyword] : {}} 
                            key={keyword}/>
                    )}
                </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords,
        sounds: state.sounds
    }
}

export default connect(
    mapStateToProps,
    soundActions
)(Results);
