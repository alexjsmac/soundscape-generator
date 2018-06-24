import React, { Component } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  background: #fff;
  padding: 0.8rem 12px;
  background: #252d49;
`

const Title = styled.h1`
  font-size: 14px;
  color: white;
`


export default () => (
  <Wrap>
    <Title>Soundscape Generator</Title>
  </Wrap>
)
