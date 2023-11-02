import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Tappable from "./Tappable";

export default class CardAction extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ holding: false, clicked: true });
  }

  render() {
    return (
      <Tappable onClick={this.onClick}>
        <Card {...this.props}>{this.props.children}</Card>
      </Tappable>
    );
  }
}
