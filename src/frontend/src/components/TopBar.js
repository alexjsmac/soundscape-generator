import React from 'react'
import styled from 'styled-components'
import { Row, Col } from './lib';
import { DesktopMaxWidth } from './lib'

const Wrap = styled.div`
  padding: 0.8rem 0;
  background: ${props => props.theme.color.primary};
`

const Title = styled.h1`
  font-size: 14px;
  color: ${props => props.theme.color.onPrimary};
`


export default () => (
  <Wrap>
    <DesktopMaxWidth>
      <Row gutter="0">
        <Col xs={12} gutter="2rem">
          <Title>Soundscape Generator</Title>
        </Col>
      </Row>
    </DesktopMaxWidth>
  </Wrap>
)
