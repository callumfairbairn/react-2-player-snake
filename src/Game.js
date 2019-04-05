import React, { Component } from 'react';
import Row from './Row'

class Game extends Component {
    constructor(props) {
        super(props);

        let sizeX = 20, sizeY = 20;
        let size = [sizeX, sizeY];

        this.state = {
            size: size,
        }
    }

    makeRows() {
        let rows = new Array(this.state.size[1]);
        for (let y = 0; y < this.state.size[1]; y++) {
            rows.push(<Row
                size={this.state.size}
            />);
        }
        return rows;
    }

    render () {
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

export default Game