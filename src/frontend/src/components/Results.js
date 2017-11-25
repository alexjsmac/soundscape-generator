import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { soundActions } from '../core/sounds';
import { Button, Input } from 'antd'
import AudioPlayer from './audio/AudioPlayer';
import Result from './Result';
import PlayAllButton from './audio/PlayAllButton';
import './result-styles.css';
import start from '../media/Start.wav'
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

        return (
            <div className="result-list">
                <PlayAllButton />
                <div className="results-header">
                    <h2>Results</h2>
                    <Button type="primary" size="large" onClick={getAllSounds}>Get Sounds</Button>
                </div>

                <form onSubmit={this.addKeyword} className="result-add">
                    <InputGroup compact>
                        <Input type="text" size="large" style={{ width: '70%' }}
                            value={newKeyword}
                            onChange={this.onKeywordChange}
                            placeholder="New label" />
                        <Button type="primary" size="large" style={{ width: '30%' }} onClick={this.addKeyword}>Add</Button>
                    </InputGroup>
                </form>

                {keywords.map((keyword, index) =>
                    <Result keyword={keyword} sound={sounds[keyword]} key={index}/>
                )}
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
