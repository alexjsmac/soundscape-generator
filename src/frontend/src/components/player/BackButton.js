import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { appActions } from '../../core/app';

import styled from 'styled-components'
import { Button } from 'antd';

const ButtonContainer = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
`

class BackButton extends Component {
  static propTypes = {
    toMediaSelection: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ButtonContainer>
        <Button 
            onClick={this.props.toMediaSelection} 
            // type="primary" 
            size="large"
            >
            Back
        </Button>
      </ButtonContainer>
    )
  }
}

export default connect(null, appActions)(BackButton);