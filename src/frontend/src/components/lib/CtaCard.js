import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa';

import CardAction from './CardAction'
import H2 from './H2'

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

const CTAMessage = styled.span`
    text-align: center;
    font-weight: bold;
    color: ${props => props.theme.color.primary};
`

export default class CtaCard extends Component {
    render() {
        const {title, description, icon, ctaMessage, onClick} = this.props;
        return (
            <Row justifyContent="flex-start" >
                <Col xs={12}>
                    <CardAction spaceAround onClick={onClick}> 
                        <Row padding="1rem">
                            <Col xs={8}>
                                <InfoHolder>
                                    <H2>{title}</H2>
                                    <p>{description}</p>
                                </InfoHolder>
                            </Col>
                            <Col xs={4}>
                                <IconSection>
                                    {icon()}
                                    <CTAMessage>{ctaMessage}</CTAMessage>
                                </IconSection>
                            </Col>
                        </Row>
                    </CardAction>
                </Col>
            </Row>
        )
    }
}

