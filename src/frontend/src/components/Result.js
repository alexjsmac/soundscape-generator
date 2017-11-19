import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';

class Keyword extends Component {
  render() {
    const { keyword, sound, deleteKeyword } = this.props;
    const remove = () => {
        deleteKeyword(keyword);
    }

    const renderSound = (sound) => (
        <div className="result-topbar">
            <div>{sound.name}</div>
            <audio src={sound.previews["preview-hq-mp3"]} controls="controls"></audio>
        </div>
    )

    return (
        <div className="result">
            <div className="result-topbar">
                <span>{keyword}</span>
                <button className="keyword-remove" onClick={remove}>X</button>
            </div>
            {(sound) ? renderSound(sound) : ""}
        </div>
    );
  }
}

export default connect(null, generalActions)(Keyword);