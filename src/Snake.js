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

    tick() {
        this.handleKeyPressArray();
        this.moveToNewLocation();
    }

    handleKeyPressArray() {
        if (!this.keyPressArray[0]) {
            return this;
        }

        let eventCode = this.keyPressArray[0];

        let directionMap = {
            37:(this.direction !== 'right') ? 'left' : 'right',
            65:(this.direction !== 'right') ? 'left' : 'right',

            39:(this.direction !== 'left') ? 'right' : 'left',
            68:(this.direction !== 'left') ? 'right' : 'left',

            38:(this.direction !== 'down') ? 'up' : 'down',
            87:(this.direction !== 'down') ? 'up' : 'down',

            40:(this.direction !== 'up') ? 'down': 'up',
            83:(this.direction !== 'up') ? 'down': 'up',
        };

        let newDirection = directionMap[eventCode];
        if (newDirection) {
            this.direction = newDirection;
            this.keyPressArray = this.keyPressArray.slice(1);
        }
    }

    moveToNewLocation() {
        // the -1 here could cause problems later on
        for (let i = this.location.length-1; i > 0; i--) {
            this.location[i] = [this.location[i-1].x, this.location[i-1].y ]
        }
        this.updateHeadLocation();
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