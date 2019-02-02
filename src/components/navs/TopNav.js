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

    renderMenuContainer = () => {
        const menuItems = [
            { text: 'Link 1' },
            { text: 'Link 2' },
            { text: 'Link 3' }
        ]

        let menuContainer = (
            <div
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.menuClick}
                className='dropdownContent'
                style={{ display: this.state.display }} >
                {menuItems.map(menuItem => {
                    return (
                        <div
                            className='menuItem'
                            onClick={this.menuClick}
                        >{menuItem.text}</div>
                    )
                })}
            </div>);

        return menuContainer;
    }

    renderDropDownMenu = () => {
        
    }

    render() {
        return (
            <ul id='topnav'>
                <li className='menubtn'>home</li>
                <li className='menubtn'>stuff</li>
                <li className='dropbtn'
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    onClick={this.menuClick}
                >
                    <span className='dropbtnLabel'>junk</span>
                    {this.renderMenuContainer()}
                </li>
            </ul>
        )
    }

}

export default TopNav;
