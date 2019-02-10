import React, { Component } from "react";
import { Link } from "@reach/router";
import { menuConfig } from './topNavMenuConfig';

import "./TopNav.css";

class TopNav extends Component {
  state = {
    display: {}
  };

  handleClick = event => {
    this.toggleDisplay(event, "none");
  };

  mouseOver = event => {
    this.toggleDisplay(event, "block");
  };

  mouseOut = event => {
    this.toggleDisplay(event, "none");
  };

  toggleDisplay = (event, displayType) => {
    const menuName = event.target.getAttribute("menu-name");
    let display = this.state.display;
    display[menuName] = displayType;
    this.setState({ display: display });
  };

  renderDropDownMenu = (menuConfig) => {
    let menuName = menuConfig.name;
    return (
      <div className="dropdown">
        <button
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          menu-name={menuName}
          className="dropbtn"
        >
          {menuName}
          <i className="fa fa-caret-down" />
        </button>
        <div
          style={{ display: this.state.display[menuName] }}
          menu-name={menuName}
          onClick={this.handleClick}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          className="dropdown-content"
        >
        {menuConfig.items.map( (menuItem, index) => {
          return (<Link key={index} menu-name={menuName} to={menuItem.to}>{menuItem.text}</Link>)
        })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="navbar">
          <Link to="/">home</Link>
          {this.renderDropDownMenu(menuConfig[0])}
          {this.renderDropDownMenu(menuConfig[1])}
          {this.renderDropDownMenu(menuConfig[2])}

        </div>
      </div>
    );
  }
}

export default TopNav;
