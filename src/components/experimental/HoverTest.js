import React, { Component } from 'react';

class HoverButton extends Component {
    state = {
        hover: false,
        display: 'none'
    }

    mouseOver = () => {
        this.setState({ hover: true, display: 'block' });
    }

    mouseOut = () => {
        this.setState({ hover: false, display: 'none' });
    }

    menuClick = () => {
        this.setState(prevState => {
            let display = 'none';
            if (prevState.display === 'none') display = 'block';
            return { hover: false, display: display }
        });
    }

    render() {
        return (
            <div>
                <div
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    onClick={this.menuClick}
                    style={{ width: '100px', height: '50px', backgroundColor: 'red' }}
                />
                <div
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    onClick={this.menuClick}
                    style={{ width: '100px', height: '50px', backgroundColor: 'black', color: 'white', display: this.state.display }} />
            </div>
        )
    }

}

export default HoverButton;
