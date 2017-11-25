import React, { Component } from 'react';
import webAudioUtil from '../../audio/webAudioUtil';
import { Icon } from 'antd';
import './audio-player-styles.css';

class GlobalAudio extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnMount() {
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="audio-player">
                hey
            </div>
        );
    }
}

export default GlobalAudio;
