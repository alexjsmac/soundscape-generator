import React, { Component } from 'react'
import { Col } from 'react-flexa';
import styled, { withTheme } from 'styled-components';
import { Card } from "../lib";
import { Settings } from 'styled-icons/material/Settings'


const Container = Col.extend`
    /* background: blue; */
`


const CardAudio = Card.extend`
    height: 70px;
    margin: 0;
    box-shadow: 0;
    border: 1px solid black;
    position: relative;
`

const Info = styled.div`
    padding: 0.2rem;
    position: absolute;
    bottom: 0;
    font-size: ${props => props.theme.fontSize.smaller};
`

const InfoIcon = styled.span`
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    height: 1.1rem;
    width: 1.1rem;
    font-size: ${props => props.theme.fontSize.small};
`

class AudioCard extends Component {
    render() {
        const { name } = this.props;
        const selected = false;
        const width = selected ? 12 : 4
        return (
            <Container xs={width} gutter="0">
                <CardAudio shadow='none'>
                    <Info>
                        <div>
                            <b>{name}</b>
                        </div>
                        <p>
                            sample sound name
                        </p>
                    </Info>
                    <InfoIcon> 
                        <Settings /> 
                    </InfoIcon>
                </CardAudio>
            </Container>
        )
    }
}

export default withTheme(AudioCard);