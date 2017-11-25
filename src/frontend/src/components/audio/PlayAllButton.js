import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';
import webAudioUtil from '../../audio/webAudioUtil';
import { Icon } from 'antd';
import './audio-player-styles.css';
import { stopAllSounds, playAllSounds } from '../../core/sounds/actions';

class GlobalAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            globalPlaying: false
        }
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnMount() {
        //TODO: dispose audio element + resonance audio source
    }

    componentDidUpdate() {

    }

    togglePlay() {
        const {playAllSounds, stopAllSounds} = this.props;
        const {globalPlaying} = this.state
        if (globalPlaying) {
            stopAllSounds();
            this.setState({globalPlaying: false})
        } else {
            playAllSounds();
            this.setState({globalPlaying: true})
        }
    }

    render() {
        const { globalPlaying, sourcePosition} = this.state;
        return (
            <button onClick={this.togglePlay} className="play-button">
                {(globalPlaying) ? <Icon type="pause-circle" /> : <Icon type="play-circle" />}
            </button>
        );
    }
}

function mapStateToProps(state) {
    return {
        sounds: state.sounds
    }
}

export default connect(mapStateToProps, soundActions)(GlobalAudio);
