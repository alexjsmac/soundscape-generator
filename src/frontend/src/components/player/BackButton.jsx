import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { appActions } from "../../core/app";

import styled from "styled-components";
import { Button } from "../lib";

class BackButton extends Component {
  static propTypes = {
    toMediaSelection: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="absolute top-3 left-3">
        <Button
          className="bg-gray-400 hover:bg-gray-500 text-gray-900 border-0"
          onClick={this.props.toMediaSelection}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default connect(null, appActions)(BackButton);
