import {Coord, areCoordsEqual} from './GlobalImports'

export class Snake {
    constructor(size, startingPosition) {
        this.length = 1;
        this.direction = 'none';
        this.location = [startingPosition];
        this.keyPressArray = [];
        this.dead = false;
        this.recovering = false;
        this.touching = false;

        // this.locationMap = {
        //     'left': this.moveLeft(),
        //     'right': this.moveRight(),
        //     'up': this.moveUp(),
        //     'down': this.moveDown(),
        // };
    }

    tick(gridSize, otherSnake) {
        this.handleKeyPressArray();
        this.updateBodyLocation();
        this.updateHeadLocation();
        this.checkBorderCollision(gridSize);
        this.checkOtherSnakeCollision(otherSnake);
        this.checkThisSnakeCollision();
        this.endRecoveryIfNotTouchingAnything();

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
        }
        this.keyPressArray = this.keyPressArray.slice(1);
    }

    updateBodyLocation() {
        for (let i = this.length; i > 0; i--) {
            this.location[i] = new Coord(this.location[i-1].x, this.location[i-1].y);
        }
    }

    updateHeadLocation() {
        if (this.dead) {
            if(this.makeSnakeWaitForTail()) {
                return;
            }
        }

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

    makeSnakeWaitForTail() {
        if (areCoordsEqual(this.location[0], this.location[this.length])) {
            this.dead = false;
            this.recovering = true;
            return false;
        }
        return true;
    }

    checkBorderCollision(gridSize) {
        if (this.returnHeadLocation().x < 0) {
            this.doCollision()
        }
        if (this.returnHeadLocation().x > gridSize.x-1) {
            this.doCollision()
        }
        if (this.returnHeadLocation().y < 0) {
            this.doCollision()
        }
        if (this.returnHeadLocation().y > gridSize.y-1) {
            this.doCollision()
        }
    }

    checkOtherSnakeCollision(snake) {
        let headLocation = this.returnHeadLocation();
        for (let i = 0; i < snake.length; i++) {
            if (areCoordsEqual(headLocation, snake.location[i])) {
                this.doCollision();
            }
        }
    }

    checkThisSnakeCollision() {
        if (this.dead || this.recovering) {
            return
        }

        for (let i = 1; i < this.length; i++) {
            if (areCoordsEqual(this.returnHeadLocation(), this.location[i])) {
                this.doCollision();
            }
        }
    }

    doCollision() {
        this.touching = true;
        this.location[0] = this.location[1];
        if (!this.recovering) {
            this.deathPunishment();
        }
    }

    deathPunishment() {
        this.dead = true;
        if (this.length > 1) {
            this.length--;
        }
    }

    endRecoveryIfNotTouchingAnything() {
        if (!this.touching && this.recovering) {
            this.recovering = false;
        }
        this.touching = false;
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

    returnHeadLocation() {
        return this.location[0];
    }
}