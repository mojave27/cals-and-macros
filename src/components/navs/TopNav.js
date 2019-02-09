import React, { Component } from "react";
import { Link } from "@reach/router";
import "./TopNav.css";

// TODO: Get these from props or imported
const dropDownOne = {
  name: "misc",
  items: [
    { text: "dead link" },
    { a: <Link to="form">form</Link> },
    { a: <Link to="/">home</Link> }
  ]
};

const dropDownTwo = {
  name: "calcs",
  items: [
    { a: <Link to="macros">macros</Link> },
    { a: <Link to="food-search">food search</Link> }
  ]
};

class TopNav extends Component {
  state = {
    hover: false,
    display: "none"
  };

  mouseOver = () => {
    this.setState({ hover: true, display: "block" });
  };

  mouseOut = () => {
    this.setState({ hover: false, display: "none" });
  };

  menuClick = () => {
    this.setState(prevState => {
      let display = "none";
      if (prevState.display === "none") display = "block";
      return { hover: false, display: display };
    });
  };

  renderMenuContainer = menuItems => {
    let menuContainer = (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        onClick={this.menuClick}
        className="dropdownContent"
        style={{ display: this.state.display }}
      >
        {menuItems.map((menuItem, index) => {
          return (
            <div key={index} className="menuItem" onClick={this.menuClick}>
              {menuItem.a ? menuItem.a : menuItem.text}
            </div>
          );
        })}
      </div>
    );

    return menuContainer;
  };

  renderDropDownMenu = menuConfig => {
    const menuText = menuConfig.name;
    let dropDownMenu = (
      <li
        className="dropbtn"
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        onClick={this.menuClick}
      >
        <span className="dropbtnLabel">{menuText}</span>
        {this.renderMenuContainer(menuConfig.items)}
      </li>
    );
    return dropDownMenu;
  };

  render() {
    return (
      <ul id="topnav">
        <li className="menubtn">
          <Link to="/">home</Link>
        </li>
        <li className="menubtn">stuff</li>
        {this.renderDropDownMenu(dropDownOne)}
        {/* {this.renderDropDownMenu(dropDownTwo)} */}
      </ul>
    );
  }
}

export default TopNav;
