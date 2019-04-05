import {Coord} from './GlobalImports'

export class Snake {
    constructor(size) {
        this.length = 1;
        this.speed = 0;
        this.direction = 'none';
        this.location = [new Coord(size.x/2, size.y/2)];
    }

    getHeadLocation() {
        return this.location[0];
    }
}