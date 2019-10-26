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
import { Router } from '@reach/router';

import AppContext from './components/context/appContext';

class App extends Component {
  state = { 
    meal: {} 
  }

  updateMeal = mealUpdate => {
    let currentMeal = this.state.meal
    let newMeal = { ...currentMeal, ...mealUpdate}
    this.setState({meal: newMeal})
  }

  render() {
    return (
      <div className={styles.App}>
        <div>
          <TopNav />
        </div>
        <AppContext.Provider value={{ 
          meal: this.state.meal,
          updateMeal: this.updateMeal
        }}>
          <Router>
            {/*  Any child or child of a child component in here can access 'AppContext'*/}
            <Home path='/' />
            <Form path='form' />
            <FoodSearch path='food-search' />
            <Meal path='meal' />
            <MealCalc path='meal-calc' />
            <HoverTest path='hovertest' />
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
