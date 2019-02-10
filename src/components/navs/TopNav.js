import React, { Component } from "react";
import { Link } from "@reach/router";

import "./TopNav.css";

class TopNav extends Component {
  state = {
    display: {
      other2: 'none',
      calcs: 'none'
    }
  }

  handleClick = (event) => {
    this.toggleDisplay(event, 'none');
  }

  mouseOver = (event) => {
    this.toggleDisplay(event, 'block');
  }

  mouseOut = (event) => {
    this.toggleDisplay(event, 'none');
  }

  toggleDisplay = (event, displayType) => {
    const menuName = event.target.getAttribute('menu-name'); 
    let display = this.state.display;
    display[menuName] = displayType;
    this.setState({display:display})
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <a href='/'>home</a>
          <a href="/">other</a>
          <div className="dropdown">
            <button 
              onMouseOver={this.mouseOver}
              onMouseOut={this.mouseOut}
              menu-name='calcs' 
              className="dropbtn"
            >
              calcs
              <i className="fa fa-caret-down" />
            </button>
            <div 
              style={{display: this.state.display.calc}} 
              menu-name='calcs' 
              onClick={this.handleClick} 
              onMouseOver={this.mouseOver}
              onMouseOut={this.mouseOut}
              className="dropdown-content"
            >
              <Link menu-name='calcs' to="form">form</Link>
              <Link menu-name='calcs' to="hovertest">hover test</Link>
              <Link menu-name='calcs' to="/">home</Link>
            </div>
          </div>

          <div menu-name='other2' onClick={this.handleClick} className="dropdown">
            <button 
              onMouseOver={this.mouseOver}
              onMouseOut={this.mouseOut}
              menu-name='other2' 
              className="dropbtn"
            >
              other2
              <i className="fa fa-caret-down" />
            </button>
            <div 
              style={{display: this.state.display.other2}} 
              menu-name='other2' 
              onClick={this.handleClick} 
              onMouseOver={this.mouseOver}
              onMouseOut={this.mouseOut}
              className="dropdown-content"
            >
              <Link menu-name='other2' to="form">form</Link>
              <Link menu-name='other2' to="hovertest">hover test</Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
