import React, { Component } from 'react';
import {Row} from './Row'
import {Snake} from './Snake'
import {Coord} from './GlobalImports'

export class Game extends Component {
    constructor(props) {
        super(props);

        let sizeX = 20, sizeY = 20;
        let size = new Coord(sizeX, sizeY);

        let startingPosition1 = new Coord(4, size.y/2);
        let startingPosition2 = new Coord(size.x-5, size.y/2);

        let snake1 = new Snake(size, startingPosition1);
        let snake2 = new Snake(size, startingPosition2);
        let snakes = {snake1, snake2};

        this.state = {
            size: size,
            snakes: snakes,
        };


        this.my_refs = {};
        this.focusByID.bind(this);
    }

    focusByID(id){
        let myRef = this.my_refs[id];
        if(myRef){
            myRef.focus();
        }
    }

    componentDidMount() {
        this.focusByID('gameDiv');
        this.timerID = setInterval(
            () => this.tick(),
            150
        );
    }

    componentWillUnmount() {
        this.focusByID('gameDiv');
    }

    makeRows() {
        let rows = new Array(this.state.size.y);
        for (let y = 0; y < this.state.size.y; y++) {
            rows.push(<Row
                size={this.state.size}
                snakes={this.state.snakes}
                row={y}
            />);
        }
        return rows;
    }

    handleKeyPress(event) {
        let eventCode = event.charCode || event.keyCode;
        let playerMap = {
            37: 'player1',
            39: 'player1',
            38: 'player1',
            40: 'player1',
            65: 'player2',
            68: 'player2',
            83: 'player2',
            87: 'player2',
        };

        if (playerMap[eventCode] === 'player1') {
            this.state.snakes.snake1.keyPressArray.push(eventCode);
        } else {
            this.state.snakes.snake2.keyPressArray.push(eventCode);
        }
    }

    handleKeyPressArray(snake) {
        if (!snake.keyPressArray[0]) {
            return snake;
        }

        let newSnake = snake;
        let eventCode = snake.keyPressArray[0];

        let directionMap = {
            37:(snake.direction !== 'right') ? 'left' : 'right',
            65:(snake.direction !== 'right') ? 'left' : 'right',

            39:(snake.direction !== 'left') ? 'right' : 'left',
            68:(snake.direction !== 'left') ? 'right' : 'left',

            38:(snake.direction !== 'down') ? 'up' : 'down',
            87:(snake.direction !== 'down') ? 'up' : 'down',

            40:(snake.direction !== 'up') ? 'down': 'up',
            83:(snake.direction !== 'up') ? 'down': 'up',
        };

        let newDirection = directionMap[eventCode];
        if (newDirection) {
            newSnake.direction = newDirection;
            newSnake.keyPressArray = snake.keyPressArray.slice(1);
        }
        return newSnake;
    }

    tick() {
        let snakes = this.state.snakes;
        let newSnake1 = this.handleKeyPressArray(this.state.snakes.snake1);
        let newSnake2 = this.handleKeyPressArray(this.state.snakes.snake2);
        snakes.snake1 = this.snakeLocationCalculation(newSnake1);
        snakes.snake2 = this.snakeLocationCalculation(newSnake2);

        this.setState({
            snakes: snakes,
        })
    }

    snakeLocationCalculation(snake) {
        let newSnake = snake;
        // the -1 here could cause problems later on
        for (let i = snake.location.length-1; i > 0; i--) {
            newSnake.location[i] = [newSnake.location[i-1].x, newSnake.location[i-1].y ]
        }
        newSnake.updateHeadLocation();
        return newSnake;
    }

    render() {
        let rows = this.makeRows();

        return (
            <div id='gameContainer'>
                <div
                    onKeyDown={(event) => this.handleKeyPress(event)}
                    tabIndex='0'
                    id='gameDiv'
                    ref={(input)=> this.my_refs['gameDiv'] = input}
                    >
                    {rows}
                </div>
            </div>
        )
    }
}