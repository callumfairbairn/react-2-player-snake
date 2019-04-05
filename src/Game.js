import React, { Component } from 'react';
import {Row} from './Row'
import {Snake} from './Snake'
import {Coord} from './GlobalImports'

export class Game extends Component {
    constructor(props) {
        super(props);

        let sizeX = 20, sizeY = 20;
        let size = new Coord(sizeX, sizeY);

        let startingPosition1 = new Coord(size.x-5, size.y/2);
        let startingPosition2 = new Coord(5, size.y/2);

        let snake1 = new Snake(size, startingPosition1);
        let snake2 = new Snake(size, startingPosition2);

        this.snakes = {snake1, snake2};
        this.state = {
            size: size,
        };
    }

    makeRows() {
        let rows = new Array(this.state.size.y);
        for (let y = 0; y < this.state.size.y; y++) {
            rows.push(<Row
                size={this.state.size}
                snakeArray={this.snakes}
                row={y}
            />);
        }
        return rows;
    }

    render() {
        let rows = this.makeRows();
        return (
            <div id='gameContainer'>
                <div>
                    {rows}
                </div>
            </div>
        )
    }
}