import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';

class Keyword extends Component {
  render() {
    const { keyword, deleteKeyword } = this.props;
    const remove = () => {
        deleteKeyword(keyword);
    }
    return (
        <div className="result">
            <span>{keyword}</span>
            <button className="keyword-remove" onClick={remove}>X</button>
        </div>
    );
  }
}

export default connect(null, generalActions)(Keyword);