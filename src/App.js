import React, { Component } from 'react';
import styles from './App.module.css';
// import './index.css';
import TopNav from './components/navs/TopNav';
import Home from './components/Home/Home';
import MealCalc from './components/MealCalc/MealCalc';
import Meal from './components/meal/Meal';
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
          <Home path="/" />
          <Form path="form" />
          <FoodSearch path="food-search" />
          <Meal path="meal" />
          <MealCalc path="meal-calc" />
          <HoverTest path="hovertest" />
        </Router>
      </div>
    );
  }
}

export default App;
