import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';
import { Button } from 'antd';
import './audio-player-styles.css';

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
        const { globalPlaying } = this.state;
        return (
            <Button onClick={this.togglePlay} type="primary" size="large">
                {(globalPlaying) ? "Stop All" : "Play All"}
            </Button>
        );
    }
}

function mapStateToProps(state) {
    return {
        sounds: state.sounds
    }
}

export default connect(mapStateToProps, soundActions)(GlobalAudio);
