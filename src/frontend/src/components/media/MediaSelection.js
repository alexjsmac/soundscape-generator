import React, { Component } from 'react'
import { FileUpload } from 'styled-icons/material/FileUpload'

import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';

import CtaCard from '../CtaCard'
import MediaExamples from './MediaExamples';


const FileIcon = FileUpload.extend`
  height: 2.5rem;
  color: ${props => props.theme.color.primary};
`

class MediaSelection extends Component {
  startScan = (fileName, url) => {
      const { setMedia } = this.props;
      setMedia({
          source: url,
          fileName: fileName
      });
  }

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
          <MediaExamples onSelect={this.startScan} />
      </div>
    )
  }
}

export default connect(
  null,
  mediaActions
)(MediaSelection)
