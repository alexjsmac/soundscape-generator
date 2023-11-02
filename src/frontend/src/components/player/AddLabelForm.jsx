import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { generalActions } from "../../core/general";

import { Input } from "antd";
import { Button } from "../lib";
const InputGroup = Input.Group;

class AddLabelForm extends Component {
  static propTypes = {
    keywords: PropTypes.array.isRequired,
    addKeyword: PropTypes.func.isRequired,
  };

  state = {
    newKeyword: "",
  };

  onKeywordChange = (e) => {
    this.setState({ newKeyword: e.target.value });
  };

  addNewKeyword = (e) => {
    const { newKeyword } = this.state;
    const { keywords, addKeyword } = this.props;
    e.preventDefault();
    e.stopPropagation();

    if (newKeyword === "") return;
    if (keywords.filter((k) => k === newKeyword).length > 0) return;

    addKeyword(newKeyword);
    this.setState({ newKeyword: "" });
  };

  render() {
    const { newKeyword } = this.state;
    return (
      <form onSubmit={this.addNewKeyword}>
        <label htmlFor="add-label" className="text-xs">
          <b>New Audio Label</b>
        </label>
        <div className="flex">
          <Input
            id="add-label"
            type="text"
            size="small"
            value={newKeyword}
            onChange={this.onKeywordChange}
            style={{
              margin: "0",
              width: "70%",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              // borderRight: "1px solid transparent",
            }}
          />
          <Button
            className="px-2 py-0 h-[24px] m-0 rounded-tl-none rounded-l-none"
            onClick={this.addKeyword}
          >
            Add
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    keywords: state.general.keywords,
  };
}

export default connect(mapStateToProps, generalActions)(AddLabelForm);
