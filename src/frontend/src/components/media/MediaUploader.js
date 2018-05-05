import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mediaActions } from '../../core/media';
import { mediaTypes } from '../../utils/formats';
import { Upload, Button, Icon } from 'antd';
import './media-uploader-styles.css'
const Dragger = Upload.Dragger;

class MediaUploader extends Component {

    // When a user chooses a new media source
    handleImageChange(file) {
        const {setMedia} = this.props;
        const reader = new FileReader();
        reader.onloadend = () => {
            setMedia({
                source: reader.result,
                fileName: file.name
            });
        }
        // Display media to user ASAP
        reader.readAsDataURL(file);
        // Begin upload process
        this.props.uploadMedia(file);
    }

    render() {
        const { source, type } = this.props;
        
        const uploaderProps = {
            beforeUpload: (file) => {
                this.handleImageChange(file);
                return false;
            }
        };

        const uploadArea = () => (
            <div className="upload-area">
                <Dragger {...uploaderProps} >
                    <p className="ant-upload-drag-icon"><Icon type="inbox"/></p>
                    <p className="ant-upload-text">Upload Image Here</p>
                    <p className="ant-upload-hint">A list of labels will then be shown under Results</p>
                </Dragger>
            </div>
        );

        const uploadButton = () => (
            <div className="upload-button">
                <Upload {...uploaderProps}>
                    <Button><Icon type="upload"/> Upload Image</Button>
                </Upload>
            </div>
        );


        const renderMedia = (source, type) => {
            if (type === mediaTypes.IMAGE) {
                console.log("image");
                return (
                    <div className="up-preview">
                        <img src={source} alt="uploaded preview"/>
                    </div>
                )
            } else if (type === mediaTypes.VIDEO) {
                console.log("video");
                return (
                    <div className="up-preview">
                        <video src={source} controls>
                            Sorry, your browser doesn't support embedded videos
                        </video>
                    </div>
                );
            }
        }

        return (
            <div className="image-uploader">
                {(!source) ?
                   uploadArea() : uploadButton()
                }
                {source && renderMedia(source, type)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      source: state.media.source,
      type: state.media.type
    };
}

export default connect(
    mapStateToProps,
    mediaActions
)(MediaUploader)
