import React, { Component } from 'react';
import styles from './App.module.css';
// import './index.css';
import TopNav from './components/navs/TopNav';
import Form from './components/forms/Form';
import FoodSearch from './components/food/FoodSearch/FoodSearch';
import HoverTest from './components/experimental/HoverTest';
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div>
          <TopNav />
        </div>
        <Router>
          <Form path="form" />
          <FoodSearch path="food-search" />
          <HoverTest path="hovertest" />
        </Router>
      </div>
    );
  }
}

export default App;
