import React, { Component } from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { generalActions } from '../../core/general';
import { soundActions } from '../../core/sounds';

import { Button, Input } from 'antd'
import { Row, Col } from 'react-flexa';
import { H2 } from '../lib'
import Result from './Result';
const InputGroup = Input.Group;


const Container = styled.div`
    /* width: 100%;
    height: 100%;
    overflow: hidden; */
`


class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newKeyword: ""
        }
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
    }

    onKeywordChange(e) {
        this.setState({newKeyword: e.target.value})
    }

    addKeyword(e) {
        const { newKeyword } = this.state
        const { keywords } = this.props;
        e.preventDefault();
        e.stopPropagation();
        if (newKeyword === "") return;
        if (keywords.filter(k => k === newKeyword).length > 0) return;
        this.props.addKeyword(this.state.newKeyword);
        this.setState({newKeyword: ""})
    }

    render() {
        const { keywords, sounds, getAllSounds } = this.props;
        const { newKeyword } = this.state;

        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <H2>Results</H2>
                        <p>List of lables for the image, click Get Sounds to populate audio</p>
                    </Col>  
                    <Col  xs={6}>
                        <Button type="primary" size="large" onClick={getAllSounds}>
                            Get Sounds
                        </Button>
                    </Col>
                </Row>
                
                {/* Add a new label */}
                <form onSubmit={this.addKeyword} className="result-add">
                    <InputGroup compact>
                        <Input type="text" size="large" style={{ width: '70%' }}
                            value={newKeyword}
                            onChange={this.onKeywordChange}
                            placeholder="New label" />
                        <Button type="primary" size="large" style={{ width: 60 }} onClick={this.addKeyword}>Add</Button>
                    </InputGroup>
                </form>

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
    {...generalActions, ...soundActions}
)(Results);
