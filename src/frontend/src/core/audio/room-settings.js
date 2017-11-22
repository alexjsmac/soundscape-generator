export const roomSizes = {
    SMALL: "SMALL",
    MEDIUM: "MEDIUM",
    LARGE: "LARGE",
    HUGE: "HUGE"
}

export function getRoomDimensions(roomSize) {
    switch (roomSize) {
        case roomSizes.SMALL:
            return {width: 1.5, height: 2.4, depth: 1.3}
        case roomSizes.MEDIUM:
            return {width: 4, height: 3.2, depth: 3.9}
        case roomSizes.LARGE:
            return {width: 8, height: 3.4, depth: 9}
        case roomSizes.HUGE:
            return {width: 20, height: 10, depth: 20,}
        default:
            break;
    }
}




export const roomTypes = {
    OUTSIDE: "OUTSIDE",
    BRICK: "BRICK",
    CURTAINS: "CURTAINS",
    MARBLE: "MARBLE",
}

export function getRoomMaterials(roomType) {
    switch (roomType) {
        case roomTypes.OUTSIDE:
            return {
                left: 'transparent',
                right: 'transparent',
                up: 'transparent',
                down: 'grass',
                front: 'transparent',
                back: 'transparent',
            }
        case roomTypes.BRICK:
            return {
                left: 'brick-bare',
                right: 'brick-bare',
                up: 'brick-bare',
                down: 'wood-panel',
                front: 'brick-bare',
                back: 'brick-bare',
            }
        case roomTypes.CURTAINS:
            return {
                left: 'curtain-heavy',
                right: 'curtain-heavy',
                up: 'wood-panel',
                down: 'wood-panel',
                front: 'curtain-heavy',
                back: 'curtain-heavy',
            }
        case roomTypes.MARBLE:
            return {
                left: 'marble',
                right: 'marble',
                up: 'marble',
                down: 'marble',
                front: 'marble',
                back: 'marble',
            }
        default:
            break;
    }
}