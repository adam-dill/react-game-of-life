import React, { Component } from 'react';
import Model from './Model';
import Board from './Board';
import './App.css';


/**
    RULES:

    Any live cell with fewer than two live neighbors dies, as if by under population.
    Any live cell with two or three live neighbors lives on to the next generation.
    Any live cell with more than three live neighbors dies, as if by overpopulation.
    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/

export default class App extends Component {

    constructor(props) {
        super(props);

        this._model = new Model(20);

        this.state = {
            buttonLabel: this.getButtonLabel()
        };
    }


    handleButtonAction() {
        if (this._model.isRunning === true) {
            this._model.stop();
        } else {
            this._model.run();
        }
        this.setState({
            buttonLabel: this.getButtonLabel()
        });
    }

    handleInfoClick() {
        window.open("https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life");
    }

    getButtonLabel() {
        return this._model.isRunning ? "Stop" : "Run";
    }

    render() {
        let c = (this._model.isRunning) ? " btn-danger" : " btn-success";
        return (
            <div className="container mb-4">
                <div className="row">
                    <h1>Game of Life
                            <i className="info-button fas fa-info-circle" onClick={this.handleInfoClick}></i>
                    </h1>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <p>To play:</p>
                        <ol>
                            <li>Click the cells on the board to toggle their active state in order to set the initial seed.<br /><b>NOTE:</b> Green indicates the cell is alive.</li>
                            <li>Click the Run button to start.</li>
                        </ol>
                        <p>The rules:</p>
                        <ol>
                            <li>Any live cell with fewer than two live neighbors dies, as if by under population.</li>
                            <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                            <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                            <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                        </ol>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <div className="board-container">
                            <Board model={this._model}></Board>
                            <button className={"action-btn btn" + c} onClick={this.handleButtonAction.bind(this)}>{this.state.buttonLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
