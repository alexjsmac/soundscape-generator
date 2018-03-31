import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';
import './image-list-styles.css';

const URL = "https://s3.amazonaws.com/soundscape-generator-photos/examples/";
// TODO: update this to read files in the bucket
const IMAGE_LIST = ["ship.jpg", "party.jpg", "concert.jpeg", "hockey.jpg"];

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            images: IMAGE_LIST
        };
    }

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

    selectImage(filename) {
        const {setMediaUrl, scanMedia} = this.props;
        console.log("selecting image", filename)
        setMediaUrl(URL + filename);
        scanMedia(filename);
    }

    render() {
        const {images, url} = this.state
        const renderImage = (image, index) => {
            const filename = image;
            const imageUrl = url + filename;
            return (
                <a onClick={this.selectImage.bind(this, filename)} key={index}>
                    <div style={{backgroundImage: `url(${imageUrl})`}}></div>
                </a>
            )
        }

        return (
            <div className="image-list-container">
                <p>Examples</p>
                <div className="image-list">
                    {images.map((image, index) => renderImage(image, index))}
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
