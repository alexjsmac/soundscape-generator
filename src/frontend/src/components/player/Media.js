import React, { Component } from 'react'
import styled from 'styled-components'
import { mediaTypes } from '../../core/media/mediaTypes'

const Image = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: blue;
    background-image: url(${props => props.source});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`

const Video = styled.video`
    width: 100%;
    /* height: 6rem; */
    margin: auto;
`

export default class Media extends Component {
    render() {
        const { src, type } = this.props;
        return (type === mediaTypes.VIDEO) ? (
            <Video src={src}></Video>
        ) : (
            <Image source={src}></Image>
        )
  }
}
