import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { appActions } from '../../core/app';

import styled from 'styled-components'
import { Button } from 'antd';

const ButtonContainer = styled.div`
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
`

class BackButton extends Component {
  static propTypes = {
    toMediaSelection: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ButtonContainer>
        <Button onClick={this.props.toMediaSelection} >
          Back
        </Button>
      </ButtonContainer>
    )
  }
}

export default connect(null, appActions)(BackButton);