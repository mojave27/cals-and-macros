import React, { Component } from "react";
import { Link } from "@reach/router";

import "./TopNav.css";

class TopNav extends Component {
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
              <a href="/">Link 3</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
