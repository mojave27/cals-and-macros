import React, { Component } from 'react';
import './TopNav.css';

class TopNav extends Component {
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
            <ul>
                <li className='dropbtn'>home</li>
                <li className='dropbtn'>stuff</li>
                <li className='dropbtn'
                        onMouseOver={this.mouseOver}
                        onMouseOut={this.mouseOut}
                        onClick={this.menuClick}
                >
                    <span className='dropbtnLabel'>junk</span>
                    <div
                        onMouseOver={this.mouseOver}
                        onMouseOut={this.mouseOut}
                        onClick={this.menuClick}
                        className='dropdownContent'
                        style={{ display: this.state.display }} >
                        <div  
                            className='menuItem'
                            onClick={this.menuClick}
                        >Link 1</div>
                        <div  
                            className='menuItem'
                            onClick={this.menuClick}
                        >Link 2</div>
                        <div  
                            className='menuItem'
                            onClick={this.menuClick}
                        ><a href="/">Link 3</a></div>
                    </div>
                </li>
            </ul>
        )
    }

}

export default TopNav;
