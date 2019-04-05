import React, { Component } from 'react';
import {Square} from './Square'
import {Coord} from './GlobalImports'


export class Row extends Component {
    render() {
        let squares = new Array(this.props.size.x);
        for (let x = 0; x < this.props.size.x; x++) {
            let coord = new Coord(x, this.props.row);

            squares.push(<Square
                size={this.props.size}
                snakeArray={this.props.snakes}
                coord={coord}
            />);
        }

        return (
            <li className="row">
                {squares}
            </li>
        )
    }
}