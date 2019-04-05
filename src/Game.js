import React, { Component } from 'react';
import {Row} from './Row'
import {Snake} from './Snake'
import {Coord} from './GlobalImports'

export class Game extends Component {
    constructor(props) {
        super(props);

        let sizeX = 20, sizeY = 20;
        let size = new Coord(sizeX, sizeY);
        // let size = {x: sizeX, y: sizeY};
        let snake = new Snake(size);

        this.Snake = snake;
        this.state = {
            size: size,
        };
    }

    makeRows() {
        let rows = new Array(this.state.size.y);
        for (let y = 0; y < this.state.size.y; y++) {
            rows.push(<Row
                size={this.state.size}
                snake={this.Snake}
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