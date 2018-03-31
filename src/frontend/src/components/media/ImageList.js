import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';
import './image-list-styles.css';

const config = {
    URL: "https://s3.amazonaws.com/soundscape-generator-photos/examples/",
    // TODO: update this to read files in the bucket
    FILE_LIST: ["ship.jpg", "party.jpg", "concert.jpeg", "hockey.jpg", "big_buck_bunny.mp4"]
};

class ImageList extends Component {

    handleImageChange(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            // send to server here
            this.props.uploadMedia(file);
        }

        reader.readAsDataURL(file)
    }

    selectMedia(fileName) {
        const { URL } = config;
        const {setMedia, scanMedia} = this.props;

        setMedia({
            source: URL + fileName,
            fileName: fileName
        });
        scanMedia(fileName);
    }

    render() {
        const { FILE_LIST, URL } = config;
        const renderMedia = (fileName, index) => {
            const imageUrl = URL + fileName;
            return (
                <a onClick={this.selectMedia.bind(this, fileName)} key={index}>
                    <div style={{backgroundImage: `url(${imageUrl})`}}></div>
                </a>
            )
        }

        return (
            <div className="image-list-container">
                <p>Examples</p>
                <div className="image-list">
                    {FILE_LIST.map((fileName, index) => renderMedia(fileName, index))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      courses: state.courses
    };
}


export default connect(
    mapStateToProps,
    mediaActions
)(ImageList)
