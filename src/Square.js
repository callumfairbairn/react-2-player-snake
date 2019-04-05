import React, { Component } from 'react';
import {areCoordsEqual} from './GlobalImports';

export class Square extends Component {
    constructor(props) {
        super(props);

        this.coord = this.props.coord;
    }

    render() {
        for (let i = 0; i < this.props.snakes.snake1.length; i++) {
            if (areCoordsEqual(this.props.snakes.snake1.location[i], this.coord)) {
                return (
                    <button className='colouredSquare' id='snake1Square'>
                    </button>
                )
            }
        }

        for (let i = 0; i < this.props.snakes.snake2.length; i++) {
            if (areCoordsEqual(this.props.snakes.snake2.location[i], this.coord)) {
                return (
                    <button className='colouredSquare' id='snake2Square'>
                    </button>
                )
            }
        }

        return (
            <button className="square">
            </button>
        );
    }
}