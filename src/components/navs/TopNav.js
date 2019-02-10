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
    // const menuName = event.target.getAttribute('menu-name'); 
    // console.log(`menuName: ${menuName}`)
    // let currDisplay = this.state.display;
    // currDisplay[menuName] = 'none';
    // this.setState({display:currDisplay})
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
            <button className="dropbtn">
              calcs
              <i className="fa fa-caret-down" />
            </button>
            <div className="dropdown-content">
              <Link to="form">form</Link>
              <Link to="hovertest">hover test</Link>
              <Link to="/">home</Link>
            </div>
          </div>
          <div menu-name='other2' onClick={this.handleClick} className="dropdown">
            <button 
              onMouseOver={this.mouseOver}
              // onMouseOut={this.mouseOut}
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
              onMouseOut={this.mouseOut}
              className="dropdown-content"
            >
              <Link menu-name='other2' to="form">form</Link>
              <Link menu-name='other2' to="hovertest">hover test</Link>
              <a menu-name='other2' href="/">Link 3</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
