import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imageActions } from '../../core/image';
import './image-uploader-styles.css'

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
    }

    _handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        
        this.props.uploadImage(file);
        
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            // send to server here

        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        return (
            <div className="image-uploader">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <div>
                        <input className="up-file-input" 
                            type="file" 
                            name="image"
                            onChange={(e)=>this._handleImageChange(e)} />
                    </div>
                </form>
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