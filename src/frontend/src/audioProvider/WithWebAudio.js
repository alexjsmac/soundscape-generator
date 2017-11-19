import React, { Component } from 'react';
import start from '../media/Start.wav'

export default function WithWebAudio(WrappedComponent, selectData) {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                roomDimensions: {
                    width: 3.1,
                    height: 2.5,
                    depth: 3.4
                },
                roomMaterials: {
                    left: 'brick-bare',
                    right: 'curtain-heavy',
                    front: 'marble',
                    back: 'glass-thin',
                    down: 'grass',
                    up: 'transparent',
                },
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
            const {sourcePosition, roomDimensions, roomMaterials} = this.state;
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

        // componentDidUpdate() {
        //     const {sourcePosition, roomDimensions, roomMaterials} = this.state;
        //     this.resonanceAudioScene.setRoomProperties(roomDimensions, this.roomMaterials);
        //     this.source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z)
        // }

        render() {
            // TODO: move state into redux
            const appAudio = {...this.appAudio, state: {...this.state}}
            return <WrappedComponent appAudio={appAudio} {...this.props} />
        }
    }
}