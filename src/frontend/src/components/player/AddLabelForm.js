import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { generalActions } from '../../core/general';

import { Button, Input } from 'antd'
const InputGroup = Input.Group

class AddLabelForm extends Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
        addKeyword: PropTypes.func.isRequired,
    }

    state = {
        newKeyword: ""
    }

    onKeywordChange = (e) => {
        this.setState({newKeyword: e.target.value})
    }

    addKeyword = (e) => {
        const { newKeyword } = this.state
        const { keywords, addKeyword } = this.props;
        e.preventDefault();
        e.stopPropagation();

        if (newKeyword === "") return;
        if (keywords.filter(k => k === newKeyword).length > 0) return;
        
        addKeyword(newKeyword);
        this.setState({newKeyword: ""})
    }

    render() {
        const { newKeyword } = this.state;
        return (
            <form onSubmit={this.addKeyword}>
                 <InputGroup compact>
                    <Input 
                        type="text" 
                        size="large" 
                        style={{ width: '70%' }}
                        value={newKeyword}
                        onChange={this.onKeywordChange}
                        placeholder="New label" 
                    />
                    <Button 
                        type="primary" 
                        size="large" 
                        style={{ width: 60 }} 
                        onClick={this.addKeyword}
                    >
                        Add
                    </Button>
                </InputGroup>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords
    }
}

export default connect(mapStateToProps, generalActions)(AddLabelForm);