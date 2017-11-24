import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imageActions } from '../../core/image';
import { Upload, Button, Icon } from 'antd';
import './image-uploader-styles.css'
const Dragger = Upload.Dragger;

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
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
            this.props.uploadImage(file);
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        const props = {
            beforeUpload: (file) => {
                this.handleImageChange(file);
                return false;
            }
        };
          
        return (
            <div className="image-uploader">
                {(!imagePreviewUrl) ? 
                    <div className="upload-area">
                        <Dragger {...props} >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Upload Image Here</p>
                            <p className="ant-upload-hint">A list of keywords and sounds will then be shown under Results</p>
                        </Dragger>
                    </div> :
                    <div className="upload-button">
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Select A New Image
                            </Button>
                        </Upload>
                    </div>
                }
                <div className="up-preview">
                    {(imagePreviewUrl) ? 
                        <img src={imagePreviewUrl} alt="uploaded preview"/> :
                        <div className="up-preview-text"></div>
                    }
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
    imageActions
)(ImageUploader)