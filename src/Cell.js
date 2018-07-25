import React, { Component } from 'react';

export default class Cell extends Component {

    constructor(props) {
        super(props);
        this.props.model.addChangeListener(this.handleChange.bind(this));
        this.state = {
            'active': false,
            'style': {
                'width': this.props.width + "%",
                'height': this.props.height + "%"
            }
        }
    }

    handleChange() {
        let active = (this.props.model.state[this.props.index] === 1);
        this.setState({active: active})
    }

    toggle() {
        // prevent toggle when running
        if (this.props.model.isRunning === true) {
            return;
        }
        let newState = !this.state.active;
        this.props.model.seed[this.props.index] = newState ? 1 : 0;
        this.setState({active:newState});
    }

    handleMouseOver() {
        if (this.props.model.drawing === true) {
            this.toggle();
        }
    }

    render() {
        let c = (this.state.active === true) ? ' active' : ' inactive';
        return (
            <div className={"cell" + c} style={this.state.style}
                 onMouseDown={this.toggle.bind(this)}
                 onMouseOver={this.handleMouseOver.bind(this)}>
                <div className="innerCell"></div>
            </div>
        );
    }
}
