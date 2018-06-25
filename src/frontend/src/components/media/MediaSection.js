import React, { Component } from 'react'
import CtaCard from '../CtaCard'
import {FileUpload} from 'styled-icons/material/FileUpload'


const FileIcon = FileUpload.extend`
  height: 2.5rem;
  color: ${props => props.theme.color.primary};
`

export default class MediaSection extends Component {
  render() {

    //TODO actually upload stuff
    function handleClick() {
      console.log("hey")
    }
    
    return (
      <div>
          <CtaCard
            title="Your Soundscape"
            description="Upload your photo or video here to generate an audio soundscape."
            icon={() => <FileIcon />}
            ctaMessage="Upload"
            onClick={handleClick}
          />
      </div>
    )
  }
}
