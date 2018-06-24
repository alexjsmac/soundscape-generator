import React, { Component } from 'react'
import CtaCard from '../CtaCard'
import {FileUpload} from 'styled-icons/material/FileUpload'



export default class MediaSection extends Component {
  render() {
    return (
      <div>
          <CtaCard
            title="Your Soundscape"
            description="Upload your photo or video here to generate an audio soundscape."
            icon={() => <FileUpload />}
            ctaMessage="Upload"
          />
      </div>
    )
  }
}
