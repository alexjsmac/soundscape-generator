import styled from 'styled-components'

const borderColor = '#aac'

export const CardBorderGrid = styled.div`
    box-shadow: 1px 0 0 0 ${borderColor}, 
        0 1px 0 0 ${borderColor}, 
        1px 1px 0 0 ${borderColor}, 
        1px 0 0 0 ${borderColor} inset, 
        0 1px 0 0 ${borderColor} inset;
`