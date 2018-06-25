import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  background: #fff;
  padding: 0.8rem 12px;
  background: ${props => props.theme.color.primary};
`

const Title = styled.h1`
  font-size: 14px;
  color: ${props => props.theme.color.onPrimary};
`


export default () => (
  <Wrap>
    <Title>Soundscape Generator</Title>
  </Wrap>
)
