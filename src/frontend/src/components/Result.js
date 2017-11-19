import React, { Component } from 'react';
import AudioPlayer from './audio/AudioPlayer';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';

class Keyword extends Component {
  render() {
    const { keyword, sound, deleteKeyword } = this.props;
    const remove = () => {
        deleteKeyword(keyword);
    }

    const renderSound = (sound) => (
        <div className="result-sound">
            <div>{sound.name}</div>
            <AudioPlayer src={sound.previews["preview-hq-mp3"]} />
        </div>
    )

    return (
        <div className="result">
            <div className="result-topbar">
                <span className="result-keyword">{keyword}</span>
                <button className="keyword-remove" onClick={remove}>X</button>
            </div>
            {(sound) ? renderSound(sound) : ""}
        </div>
    );
  }
}

export default connect(null, generalActions)(Keyword);