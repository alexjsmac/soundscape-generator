import React, { Component } from 'react'
import PropTypes from 'prop-types'


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
            <div
                onClick={this.onClick} 
                onMouseDown={this.mouseDown}
                onTouchStart={this.pointerDown}
                onTouchEnd={this.pointerUp}>
                {this.props.children}
            </div>
        )
    }
}