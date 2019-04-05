import React, { Component } from 'react';
import {areCoordsEqual} from './GlobalImports';

export class Square extends Component {
    constructor(props) {
        super(props);

        this.coord = this.props.coord;
    }

    render() {
        for (let i = 0; i < this.props.snake.length; i++) {
            if (areCoordsEqual(this.props.snake.location[i], this.coord)) {
                return (
                    <button className="colouredSquare">
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