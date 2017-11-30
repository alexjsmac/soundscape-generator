import React, { Component } from 'react';
import AudioPlayer from './audio/AudioPlayer';
import { connect } from 'react-redux';
import { generalActions } from '../core/general';
import { Button } from 'antd'

class Keyword extends Component {
    render() {
        const { keyword, sound, deleteKeyword } = this.props;
        const soundObj = sound.sound;
        const remove = () => {
            deleteKeyword(keyword);
        }

        const renderSound = (sound, keyword) => (
            <div className="result-sound">
                <AudioPlayer sound={sound} name={sound.name} keyword={keyword} />
            </div>
        )

        return (
            <div className="result">
                <div className="result-topbar">
                    <span className="result-keyword">{keyword}</span>
                    <Button type="danger" shape="circle" icon="close" onClick={remove}/>
                </div>
                {(soundObj) ? renderSound(soundObj, keyword) : ""}
            </div>
        );
    }
}

export default connect(null, generalActions)(Keyword);