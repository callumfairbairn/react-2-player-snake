export class Snake {
    constructor(size, startingPosition) {
        this.length = 1;
        this.speed = 1;
        this.direction = 'none';
        this.location = [startingPosition];
        this.keyPressArray = [];

        // this.locationMap = {
        //     'left': this.moveLeft(),
        //     'right': this.moveRight(),
        //     'up': this.moveUp(),
        //     'down': this.moveDown(),
        // };
    }

    updateHeadLocation() {
        if (this.direction === 'left') {
            this.moveLeft();
        } else if (this.direction === 'right') {
            this.moveRight();
        } else if (this.direction === 'up') {
            this.moveUp();
        } else if (this.direction === 'down') {
            this.moveDown();
        }
    }

    moveUp() {
        this.location[0].y--;
    }

    moveDown() {
        this.location[0].y++;
    }

    moveLeft() {
        this.location[0].x--;
    }

    moveRight() {
        this.location[0].x++;
    }
}