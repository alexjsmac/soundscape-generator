import React, { Component } from 'react';
import AudioPlayer from './audio/AudioPlayer';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { Button } from 'antd'

class Keyword extends Component {
  render() {
    const { keyword, sound, deleteKeyword } = this.props;
    const remove = () => {
        deleteKeyword(keyword);
    }

    const renderSound = (sound) => (
        <div className="result-sound">
            <AudioPlayer src={sound.previews["preview-hq-mp3"]} name={sound.name} />
        </div>
    )

    return (
        <div className="result-container">
            <div className="result-topbar">
                <span className="result-keyword">{keyword}</span>
                <Button type="danger" shape="circle" icon="close" onClick={remove}/>
            </div>
            {(sound) ? renderSound(sound) : ""}
        </div>
    );
  }
}

export default connect(null, generalActions)(Keyword);