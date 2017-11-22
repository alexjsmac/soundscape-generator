import React, { Component } from 'react';
import { connect } from 'react-redux'

export default function WithWebAudio(WrappedComponent, selectData) {

    class ResultComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                sourcePosition: {
                    x: -0.707,
                    y: -0.707,
                    z: 0
                },
                listenerPosition: {
                    x: -0.707,
                    y: -0.707,
                    z: 0
                }
            }
            this.appAudio = {};
        }

        componentWillMount() {
            const {roomDimensions, roomMaterials} = this.props;
            // problem with ResonanceAudio webpack build...so just adding script to index.html for now
            const ResonanceAudio = window.ResonanceAudio;
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            
            this.appAudio.audioContext = new AudioContext();
            this.appAudio.resonanceAudioScene = new ResonanceAudio(this.appAudio.audioContext);
            this.appAudio.resonanceAudioScene.output.connect(this.appAudio.audioContext.destination);
            this.appAudio.resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);
        }

        componentWillUnMount() {
            this.appAudio.audioContext.close();
        }

        componentDidUpdate() {
            console.log("updating web audio provider")
            const { roomDimensions, roomMaterials} = this.props;
            this.appAudio.resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);
            console.log(this.appAudio.resonanceAudioScene)
        }

        render() {
            const appAudio = {
                ...this.appAudio, 
                state: {...this.state}
            }
            return <WrappedComponent appAudio={appAudio} {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            roomDimensions: state.audio.roomDimensions,
            roomMaterials: state.audio.roomMaterials
        }
    };

    return connect(mapStateToProps, null)(ResultComponent)
}