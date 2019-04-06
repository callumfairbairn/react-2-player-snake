export function areCoordsEqual(location1, location2) {
    return location1.x === location2.x && location1.y === location2.y
}

export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function randomAppleLocation(size) {
    let appleX = Math.floor(Math.random()*size.x);
    let appleY = Math.floor(Math.random()*size.y);

    return new Coord(appleX, appleY);
}

