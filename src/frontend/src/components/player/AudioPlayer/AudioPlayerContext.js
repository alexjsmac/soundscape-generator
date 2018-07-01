import React from 'react'

const AudioPlayerContext = React.createContext({
    sourcePosition: {
        x: 0,
        y: 0,
        z: 0
    },
    keyword: "",
    gain: 0,
    isPlaying: false,
    name: "",
    togglePlay: () => {},
    updateSourcePosition: () => {},
    setGain: () => {},
    shuffle: () => {}
});

export default AudioPlayerContext

export function withAudioPlayerContext(Component) {
    return function AudioComponent(props) {
        return (
            <AudioPlayerContext.Consumer>
                {context => <Component {...props} context={context} />}
            </AudioPlayerContext.Consumer>
        )
    }
}