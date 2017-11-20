const RoomSizes = {
    small: {
        width: 1.5, height: 2.4, depth: 1.3,
    },
    medium: {
        width: 4, height: 3.2, depth: 3.9,
    },
    large: {
        width: 8, height: 3.4, depth: 9,
    },
    huge: {
        width: 20, height: 10, depth: 20,
    }
};

// RoomSizes from Resonance audio demo
export function getRoomSize(size) {
    return RoomSizes[size]
} 