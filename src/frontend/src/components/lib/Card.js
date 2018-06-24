import styled from 'styled-components'

export default styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    margin: ${props => props.spaceAround ? '1em 1em' : '0'};
`