export function areCoordsEqual(location1, location2) {
    return location1.x === location2.x && location1.y === location2.y
}

export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

