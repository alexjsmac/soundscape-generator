import theme from '../theme'

const borderColor = theme.color.borderOne;

export const gridBorder = `
    box-shadow: 1px 0 0 0 ${borderColor}, 
        0 1px 0 0 ${borderColor}, 
        1px 1px 0 0 ${borderColor}, 
        1px 0 0 0 ${borderColor} inset, 
        0 1px 0 0 ${borderColor} inset;
`