import React, { Component } from 'react'


import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';

import MediaExamples from './MediaExamples';
import MediaUploader from './MediaUploader';


class MediaSelection extends Component {
  startScan = (fileName, url) => {
      const { setMedia } = this.props;
      setMedia({
          source: url,
          fileName: fileName
      });
  }

  render() {
    
    return (
      <div>
          <MediaUploader />
          <MediaExamples onSelect={this.startScan} />
      </div>
    )
  }
}

export default connect(
  null,
  mediaActions
)(MediaSelection)
