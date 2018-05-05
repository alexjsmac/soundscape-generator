import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';

import './media-list-styles.css';

const config = {
    URL: "https://s3.amazonaws.com/soundscape-generator-photos/examples/",
    // TODO: update this to read files in the bucket
    FILE_LIST: [
        {type: "IMG", file: "ship.jpg"}, 
        {type: "IMG", file: "party.jpg"},
        {type: "IMG", file: "concert.jpeg"},
        {type: "IMG", file: "hockey.jpg"},
        {type: "VID", file: "big_buck_bunny.mp4"}
    ]
};

class MediaList extends Component {

    handleImageChange(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            // send to server here
            this.props.uploadMedia(file);
            this.selectMedia = this.selectMedia.bind(this);
        }

        reader.readAsDataURL(file)
    }

    selectMedia(fileName) {
        const { URL } = config;
        const { setMedia } = this.props;
        setMedia({
            source: URL + fileName,
            fileName: fileName
        });
    }

    render() {
        const { FILE_LIST, URL } = config;
        
        const renderMedia = (file, index) => {
            const fileURL = URL + file.file;
            const onClick = () => this.selectMedia(file.file);
            return (
                <div className="media-preview">
                    <a onClick={onClick} key={index}>
                        {(file.type === "IMG") ? (
                            <div style={{backgroundImage: `url(${fileURL})`}} className="media-img"></div>
                        ) : (
                            <video src={fileURL} className="media-video"></video>
                        )}
                    </a>
                </div>
            )
        }

        return (
            <div className="media-list-container">
                <p>Examples</p>
                <div className="media-list">
                    {FILE_LIST.map((file, index) => renderMedia(file, index))}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    mediaActions
)(MediaList)
