import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import { Row } from 'react-flexa';
import { Icon } from 'antd'
import Result from './Result';

const ResultsContainer = Row.extend`
    position: relative;
    top: -1px;
`

const LoadingContainer = ResultsContainer.extend`
    height: 100%;
`

class Results extends Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
        isScanning: PropTypes.bool.isRequired,
        isUploading: PropTypes.bool.isRequired,
    }
    
    render() {
        const { keywords, isScanning, isUploading } = this.props;
        const renderLoader = (message) => (
            <div>
                <Row justifyContent="center">
                    <Icon type="loading" style={{fontSize: "28px", padding: "3rem 0 1rem"}}/>
                </Row>
                <b>{message}</b>
            </div>
        )

        if (isScanning || isUploading) {
            return (
                <LoadingContainer 
                    justifyContent="center" 
                    // alignItems="center"
                >
                    {(isUploading) ? renderLoader("Uploading Media To Server") : ""}
                    {(isScanning) ? renderLoader("Scanning Media For Labels") : ""}
                </LoadingContainer>
            )
        }
        return (
            <ResultsContainer>
                {keywords.map((keyword) =>
                    <Result keyword={keyword} key={keyword} />
                )}
            </ResultsContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords,
        isUploading: state.media.isUploading,
        isScanning: state.media.isScanning
    }
}

export default connect(
    mapStateToProps,
    null
)(Results);
