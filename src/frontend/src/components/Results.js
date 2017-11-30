import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { soundActions } from '../core/sounds';
import { Button, Input } from 'antd'
import Result from './Result';
import Header from './common/Header'
import RoomSettings from './audio/RoomSettings';
import './result-styles.css';
const InputGroup = Input.Group;

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
        e.preventDefault();
        e.stopPropagation();
        if (this.state.newKeyword === "") return;
        this.props.addKeyword(this.state.newKeyword);
        this.setState({newKeyword: ""})
    }

    render() {
        const { keywords, sounds, getAllSounds } = this.props;
        const { newKeyword } = this.state;
        const hasSounds = Object.keys(sounds).length > 0;

        return (
            <div className="results">
                <Header title="Results" 
                    desc="List of lables for the image, click Get Sounds to populate audio" 
                    buttonTitle="Get Sounds"
                    buttonAction={getAllSounds}/>
                <form onSubmit={this.addKeyword} className="result-add">
                    <InputGroup compact>
                        <Input type="text" size="large" style={{ width: '70%' }}
                            value={newKeyword}
                            onChange={this.onKeywordChange}
                            placeholder="New label" />
                        <Button type="primary" size="large" style={{ width: 60 }} onClick={this.addKeyword}>Add</Button>
                    </InputGroup>
                </form>
                {(hasSounds) ? <RoomSettings /> : ""}
                <div className="results-list">
                    {keywords.map((keyword, index) =>
                        <Result keyword={keyword} 
                            sound={(sounds[keyword]) ? sounds[keyword] : {}} 
                            key={index}/>
                    )}
                </div>
            </div>
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
