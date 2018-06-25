import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Tappable from './Tappable'

export default class CardAction extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }
  
    constructor(props) {
        super(props)

        this.state = {
            clicked: false,
            holding: false
        };
        this.onClick = this.onClick.bind(this);
        this.onHold = this.onHold.bind(this)
    }

    onClick() {
        this.setState({holding: false, clicked: true})
    }

    onHold() {
        this.setState({holding: true})
    }

    render() {
        const { clicked, holding } = this.state;
        const shadow = (holding) ? 0 : 1;
        return (
            <Tappable onClick={this.onClick} onHold={this.onHold} >
                <Card {...this.props} shadow={shadow}>
                    {this.props.children}
                </Card>
            </Tappable>
        )
    }
}
