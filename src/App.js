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
import DbManage from './components/admin/datastore/DbManage';


class App extends Component {
  state = { meal: {} }

  updateMeal = update => {
    let meal = this.state.meal
    this.setState({meal: meal})
  }

  render() {
    return (
      <div className={styles.App}>
        <div>
          <TopNav />
        </div>
          <Router>
            {/*  Any child or child of a child component in here can access 'AppContext'*/}
            <Home path='/' />
            <Form path='form' />
            <FoodSearch path='food-search' />
            <Meal path='meal' />
            <MealCalc path='meal-calc' />
            <HoverTest path='hovertest' />
            <DbManage path='manage-foods-db' />
            <DbManage path='manage-meals-db' />
          </Router>
      </div>
    );
  }
}

export default App;
