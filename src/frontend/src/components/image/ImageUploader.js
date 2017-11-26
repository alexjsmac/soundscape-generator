import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imageActions } from '../../core/image';
import { Upload, Button, Icon } from 'antd';
import './image-uploader-styles.css'
const Dragger = Upload.Dragger;

class ImageUploader extends Component {
    handleImageChange(file) {
        const {setImageUrl} = this.props;
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
            // send to server here
        }
        this.props.uploadImage(file);
        reader.readAsDataURL(file)
    }

    render() {
        let { imageUrl } = this.props;
        const props = {
            beforeUpload: (file) => {
                this.handleImageChange(file);
                return false;
            }
        };

        return (
            <div className="image-uploader">
                {(!imageUrl) ?
                    <div className="upload-area">
                        <Dragger {...props} >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Upload Image Here</p>
                            <p className="ant-upload-hint">A list of labels will then be shown under Results</p>
                        </Dragger>
                    </div> :
                    <div className="upload-button">
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Upload Image
                            </Button>
                        </Upload>
                    </div>
                }
                <div className="up-preview">
                    {(imageUrl) ?
                        <img src={imageUrl} alt="uploaded preview"/> :
                        <div className="up-preview-text"></div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      imageUrl: state.image.imageUrl
    };
}


export default connect(
    mapStateToProps,
    imageActions
)(ImageUploader)
