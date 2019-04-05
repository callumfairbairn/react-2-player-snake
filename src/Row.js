import React, { Component } from 'react';
import Square from './Square'

class Row extends Component {
    render() {
        let squares = new Array(this.props.size[0]);
        for (let x = 0; x < this.props.size[0]; x++) {
            squares.push(<Square size={this.props.size}/>);
        }

        return (
            <li className="row">
                {squares}
            </li>
        )
    }
}

export default Row