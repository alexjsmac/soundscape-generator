import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import './loading-state-styles.css';

class LoadingState extends Component {
    render() {
        const { isUploading, isScanning} = this.props;
        const renderLoader = (message) => <span><Icon type="loading" /> {message}</span>

        return (
            <div className="image-loading-states">
                {(isUploading) ? renderLoader("Uploading Image To Server") : ""}
                {(isScanning) ? renderLoader("Scanning Image For Labels") : ""}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isUploading: state.media.isUploading,
        isScanning: state.media.isScanning
    };
}


export default connect(mapStateToProps, null)(LoadingState)
