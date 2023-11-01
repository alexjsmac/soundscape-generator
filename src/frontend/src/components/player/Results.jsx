import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Row } from "../lib";
import Result from "./Result";
import styled from "styled-components";

const ResultsContainer = styled(Row)`
  position: relative;
  top: -1px;
`;

const MessageContainer = styled(ResultsContainer)`
  height: 100%;
`;

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
        <Row justifyContent="center">
          {/* <Icon type="loading" style={{fontSize: "28px", padding: "3rem 0 1rem"}}/> */}
        </Row>
        <b>{message}</b>
      </div>
    );

    if (hasError) {
      return (
        <MessageContainer justifyContent="center">
          <b style={{ fontSize: "18px", padding: "3rem 0 1rem" }}>
            Error loading media
          </b>
        </MessageContainer>
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
      <ResultsContainer gutter="0">
        {keywords.map((keyword) => (
          <Result keyword={keyword} key={keyword} />
        ))}
      </ResultsContainer>
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
