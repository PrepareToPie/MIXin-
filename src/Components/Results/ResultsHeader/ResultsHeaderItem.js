import React, { Component } from 'react';

class ResultsHeaderItem extends Component {
    state = {
        isJumpy: "",
    }

    handleClick = () => {
        this.setState({ isJumpy: "jump" });
        setTimeout(() => {
            this.setState({ isJumpy: "" });
        }, 500);
        this.props.onClick();
    }

    render() {
        let classNames = `${this.props.active ? "active" : ""} ${this.state.isJumpy}`
        return (
            <li className={classNames}
                id={this.props.id}
                onClick={this.handleClick}>
                {this.props.title}
            </li>
        );
    }
}

export default ResultsHeaderItem;