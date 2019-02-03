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

    // renderMenuContainer = (menuItems) => {
    renderMenuContainer = () => {
        // TODO: Get these from props
        const menuItems = [
            { text: 'Link 1' },
            { text: 'Link 2' },
            { a: <a href='/'>Link 3</a> },
            // { link: <Link to='/' />}
        ];

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
                        >{menuItem.a ? menuItem.a : menuItem.text}</div>
                    )
                })}
            </div>);

        return menuContainer;
    }

    renderDropDownMenu = () => {
        const menuText = 'junk';
        let dropDownMenu = (
            <li className='dropbtn'
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.menuClick}
            >
                <span className='dropbtnLabel'>{menuText}</span>
                {this.renderMenuContainer()}
            </li>
        );
        return dropDownMenu;
    }

    render() {
        return (
            <ul id='topnav'>
                <li className='menubtn'>home</li>
                <li className='menubtn'>stuff</li>
                {this.renderDropDownMenu()}
            </ul>
        )
    }

}

export default TopNav;
