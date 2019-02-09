import React, { Component } from 'react';
// import './App.css';
import TopNav from './components/navs/TopNav';
import Form from './components/forms/Form';
import HoverTest from './components/experimental/HoverTest';
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <TopNav />
        </div>
        <Router>
          <Form path="form" />
          <HoverTest path="hovertest" />
        </Router>
      </div>
    );
  }
}

export default App;
