import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa';

import {Card, H2} from './lib'

const InfoHolder = styled.div`
    padding: 1rem;
`

const IconSection = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const IconWrap = styled.div`
    width: 40%;
`

const CTAMessage = styled.span`
    text-align: center;
    font-weight: bold;
`

export default ({title, description, icon, ctaMessage}) => (
    <Row justifyContent="flex-start">
        <Col xs={12}>
            <Card spaceAround>
                <Row padding="1rem">
                    <Col xs={8}>
                        <InfoHolder>
                            <H2>{title}</H2>
                            <p>{description}</p>
                        </InfoHolder>
                    </Col>
                    <Col xs={4}>
                        <IconSection>
                            <IconWrap>
                                {icon()}
                            </IconWrap>
                            <CTAMessage>{ctaMessage}</CTAMessage>
                        </IconSection>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
)
