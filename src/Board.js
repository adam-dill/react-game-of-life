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

    handleMouseDown() {
        if (this.props.model.isRunning === false) {
            this.props.model.drawing = true;
        }
    }

    handleMouseOver() {
        if (this.props.model.isRunning === false) {
            this.props.model.drawing = false;
        }
    }

    render() {
        return (
            <div className="board"
                 onMouseDown={this.handleMouseDown.bind(this)}
                 onMouseUp={this.handleMouseOver.bind(this)}>
            {this.cells.map(value => {
                return <Cell {...value} />
            })}
            </div>
        );
    }
}
