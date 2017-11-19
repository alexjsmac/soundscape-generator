import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { soundActions } from '../core/sounds';

import Result from './Result';
import './result-styles.css';

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
        this.props.addKeyword(this.state.newKeyword);
        this.setState({newKeyword: ""})
    }

    render() {
        const { keywords, sounds, getAllSounds } = this.props;
        const { newKeyword } = this.state;

        return (
            <div className="result-list">
                <div>
                    <h2>Results</h2>
                    <button onClick={getAllSounds}>Get Sounds</button>
                </div>
                
                <form onSubmit={this.addKeyword}>
                    <input type="text" value={newKeyword} onChange={this.onKeywordChange}/>
                    <input type="submit" value="Add"/>
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