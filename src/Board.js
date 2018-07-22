import React, { Component } from 'react';
import Cell from './Cell';


export default class Board extends Component {

    constructor(props) {
        super(props);

        let size = Math.sqrt(this.props.model.state.length);

        this.cells = [];
        let cellHeight = 100 / size;
        let cellWidth = 100 / size;
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                this.cells.push({
                    key: row + "-" + column,
                    index: column + (row * size),
                    height: cellHeight,
                    width: cellWidth,
                    model: this.props.model
                });
            }
        }
    }


    render() {
        return (
            <div className="board">
            {this.cells.map(value => {
                return <Cell {...value} />
            })}
            </div>
        );
    }
}
