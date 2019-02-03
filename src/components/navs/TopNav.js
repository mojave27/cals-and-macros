import React, { Component } from 'react';
import './TopNav.css';

const menuConfig = {
    menuItems: [
        {   menuName: 'home' },
        {   menuName: 'stuff' },
        {   menuName: 'link',
            a: (<a href='/'>{'link'}</a>),
        },
        {
            menuName: 'calc',
            dropDownItems: [
                { text: 'Link 1' },
                { text: 'Link 2' },
                { a: <a href='/'>Link 3</a> },
                // { link: <Link to='/' />}
            ]
        }
    ]
}

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
    renderMenuContainer = (menuItems) => {
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

    renderDropDownMenu = (menuItem) => {
        let dropDownMenu = (
            <li className='dropbtn'
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.menuClick}
            >
                <span className='dropbtnLabel'>{menuItem.menuName}</span>
                {this.renderMenuContainer(menuItem.dropDownItems)}
            </li>
        );
        return dropDownMenu;
    }

    renderStaticMenuItem = (menuItem) => {
        let innerContent = menuItem.a ? menuItem.a : menuItem.menuName;
        let staticMenuItem = (
            <li className='menubtn'>{innerContent}</li>
        );
        return staticMenuItem;
    }

    renderTopNav = () => {
        console.log(`menuItems: ${JSON.stringify(menuConfig.menuItems)}`);
        return menuConfig.menuItems.map( menuItem => {
            if(menuItem.dropDownItems){
                return this.renderDropDownMenu(menuItem);
            }else{
                return this.renderStaticMenuItem(menuItem);
            }
        })
    }

    render() {
        return (
            <ul id='topnav'>
                {this.renderTopNav()}
            </ul>
        )
    }

}

export default TopNav;
