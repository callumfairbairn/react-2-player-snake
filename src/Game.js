import React, { Component } from 'react';
import {Row} from './Row'
import {Snake} from './Snake'
import {areCoordsEqual, Coord, randomAppleLocation} from './GlobalImports'

export class Game extends Component {
    constructor(props) {
        super(props);

        let sizeX = 20, sizeY = 20;
        let size = new Coord(sizeX, sizeY);

        let startingPosition1 = new Coord(size.x-5, size.y/2);
        let startingPosition2 = new Coord(4, size.y/2);

        let snake1 = new Snake(size, startingPosition1);
        let snake2 = new Snake(size, startingPosition2);
        let snakes = {snake1, snake2};

        this.state = {
            size: size,
            snakes: snakes,
            appleLocation: randomAppleLocation(size),
            goal: 10,
            winner: 'none',
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
            100
        );
    }

    componentWillUnmount() {
        this.focusByID('gameDiv');
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

    tick() {
        if (this.state.winner !== 'none') {
            return
        }

        let newSnake1 = this.state.snakes.snake1;
        let newSnake2 = this.state.snakes.snake2;

        newSnake1.tick(this.state.size, this.state.snakes.snake2);
        newSnake2.tick(this.state.size, this.state.snakes.snake1);

        newSnake1 = this.updateSnakeOnAppleCollision(newSnake1);
        newSnake2 = this.updateSnakeOnAppleCollision(newSnake2);

        this.checkForWinner(newSnake1, newSnake2);

        let newSnakes = {snake1: newSnake1, snake2: newSnake2};
        this.setState({
            snakes: newSnakes,
        });
    }

    updateSnakeOnAppleCollision(snake) {
        let appleLocation = this.state.appleLocation;
        if (areCoordsEqual(snake.returnHeadLocation(), appleLocation)) {
            snake.length++;
            appleLocation = this.generateNewAppleLocation();
        }

        this.setState({
            appleLocation: appleLocation
        });
        return snake;
    }

    generateNewAppleLocation() {
        let appleLocation = randomAppleLocation(this.state.size);

        if (this.isAppleUnderSnake(this.state.snakes.snake1, appleLocation) || this.isAppleUnderSnake(this.state.snakes.snake2, appleLocation)) {
            appleLocation = this.generateNewAppleLocation();
        }
        return appleLocation;
    }

    isAppleUnderSnake(snake, appleLocation) {
        for (let i = 0; i < snake.length; i++) {
            if (areCoordsEqual(snake.location[i], appleLocation)) {
                return true;
            }
        }
        return false;
    }

    checkForWinner(snake1, snake2) {
        if (snake1.length === this.state.goal) {
            this.setState({
                winner: 'Black snake'
            });
        }
        if (snake2.length === this.state.goal) {
            this.setState({
                winner: 'Blue snake'
            });
        }
    }

    makeRows() {
        let rows = new Array(this.state.size.y);
        for (let y = 0; y < this.state.size.y; y++) {
            rows.push(<Row
                size={this.state.size}
                snakes={this.state.snakes}
                row={y}
                appleLocation={this.state.appleLocation}
            />);
        }
        return rows;
    }

    makePlayerButtons() {
        let playerButtons = new Array(2);
        playerButtons.push(
            <div className='scoreContainer' id='scoreContainer2'>
                <button className='colouredSquare' id='snake2Square'>
                </button>
                <div>
                    Score: {this.state.snakes.snake2.length}
                </div>

            </div>
        );

        playerButtons.push(
            <div className='scoreContainer' id='scoreContainer1'>
                <button className='colouredSquare' id='snake1Square'>
                </button>
                <div>
                    Score: {this.state.snakes.snake1.length}
                </div>
            </div>);
        return playerButtons;
    }

    makeWinnerMessage() {
        if (this.state.winner !== 'none') {
            if (this.state.winner === 'Black snake') {
                return (
                    <div id="message">
                        CONGRATULATIONS! {this.state.winner} wins!
                    </div>
                );
            } else {
                return (
                    <div id="blueMessage">
                        CONGRATULATIONS! {this.state.winner} wins!
                    </div>
                );
            }
        }
    }

    render() {
        let rows = this.makeRows();
        let playerButtons = this.makePlayerButtons();
        let winnerMessage = this.makeWinnerMessage();
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
                <div className='bothScoresContainer'>
                    {playerButtons}
                </div>
                {winnerMessage}
            </div>
        )
    }
}