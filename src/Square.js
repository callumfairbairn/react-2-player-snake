import React, { Component } from 'react';
import {areCoordsEqual} from './GlobalImports';

export class Square extends Component {
    constructor(props) {
        super(props);

        this.coord = this.props.coord;
        this.snake1 = this.props.snakes.snake1;
        this.snake2 = this.props.snakes.snake2;
    }

    renderSnake(snake) {
        for (let i = 0; i < snake.length; i++) {
            if (areCoordsEqual(snake.location[i], this.coord)) {
                if (snake === this.snake1) {
                    return <button className='colouredSquare' id='snake1Square'> </button>;
                } else {
                    return <button className='colouredSquare' id='snake2Square'> </button>
                }
            }
        }
    }

    render() {

        let button = this.renderSnake(this.snake1);
        if (button) return button;

        button = this.renderSnake(this.snake2);
        if (button) return button;

        return (
            <button className="square">
            </button>
        );
    }
}