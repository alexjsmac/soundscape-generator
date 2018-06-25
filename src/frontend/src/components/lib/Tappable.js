import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const TappableEl = styled.div`
    cursor: pointer;
`


export default class Tappable extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        onHold: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props)
    
        this.state = {
            clicked: false,
            holding: false    
        }

        this.onClick = this.onClick.bind(this);
        this.pointerDown = this.pointerDown.bind(this);
        this.pointerUp = this.pointerUp.bind(this)
    }
    
    onClick() {
        this.setState({clicked: true})
        this.props.onClick();
    }

    pointerDown() {
        this.setState({clicked: false, holding: true})
        this.props.onHold();
    }

    pointerUp() {
        this.setState({holding: false, clicked: true});
        this.props.onClick();
    }

    render() {
        return (
            <TappableEl
                onClick={this.onClick} 
                onMouseDown={this.pointerDown}
                onMouseUp={this.pointerUp}
                onTouchStart={this.pointerDown}
                onTouchEnd={this.pointerUp}>
                {this.props.children}
            </TappableEl>
        )
    }
}