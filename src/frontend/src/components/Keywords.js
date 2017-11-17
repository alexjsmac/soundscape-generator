import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { soundActions } from '../core/sounds';

import Keyword from './Keyword';
import './keyword-styles.css';

class Keywords extends Component {
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
        const { keywords, getAllSounds } = this.props;
        const { newKeyword } = this.state;

        return (
            <div className="result-list">
                <span>Keywords: </span>
                <button onClick={getAllSounds}>Get Sounds</button>
                <form onSubmit={this.addKeyword}>
                    <input type="text" value={newKeyword} onChange={this.onKeywordChange}/>
                    <input type="submit" value="Add"/>
                </form>
                
                {keywords.map((keyword, index) =>
                    <Keyword keyword={keyword} key={index}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords
    }
}

export default connect(
    mapStateToProps, 
    {...generalActions, ...soundActions}
)(Keywords);