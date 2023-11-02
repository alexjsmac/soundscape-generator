import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Result from "./Result";

class Results extends Component {
  static propTypes = {
    keywords: PropTypes.array.isRequired,
    isScanning: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
  };

  render() {
    const { keywords, isScanning, hasError } = this.props;
    const renderLoader = (message) => (
      <div>
        <div>
          {/* <Icon type="loading" style={{fontSize: "28px", padding: "3rem 0 1rem"}}/> */}
        </div>
        <b>{message}</b>
      </div>
    );

    if (hasError) {
      return (
        <div className="relative h-full">
          <b style={{ fontSize: "18px", padding: "3rem 0 1rem" }}>
            Error loading media
          </b>
        </div>
      );
    }

    if (isScanning) {
      return (
        <MessageContainer justifyContent="center">
          {isScanning ? renderLoader("Scanning Media For Labels") : ""}
        </MessageContainer>
      );
    }

    return (
      <>
        {keywords.map((keyword) => (
          <Result keyword={keyword} key={keyword} />
        ))}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    keywords: state.general.keywords,
    isScanning: state.media.isScanning,
    hasError: state.media.hasError,
  };
}

export default connect(mapStateToProps, null)(Results);
