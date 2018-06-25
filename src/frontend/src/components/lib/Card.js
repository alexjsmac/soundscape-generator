import styled from 'styled-components'

function boxShadow(shadow) {
    const standard = '0 2px 8px 0 rgba(0,0,0,0.2)';
    const pressed = '0 1px 6px 0 rgba(0,0,0,0.1)';
    switch (shadow) {
        case 0: return pressed;
        case 1: return standard;
        default: return standard;
    }
}

export default styled.div`
    box-shadow: ${props => boxShadow(props.shadow)};
    margin: ${props => props.spaceAround ? '1rem 1rem' : '0'};
    margin-bottom: ${props => props.mb ? '1rem' : '0'};
    transition: 0.1s;
    overflow: hidden;
`