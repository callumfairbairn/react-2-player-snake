export class Snake {
    constructor(size, startingPosition) {
        this.length = 1;
        this.speed = 0;
        this.direction = 'none';
        this.location = [startingPosition];
    }

    getHeadLocation() {
        return this.location[0];
    }
}