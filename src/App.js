import React from 'react'
import styles from './App.module.css'
import TopNav from './components/navs/TopNav'
import Home from './components/Home/Home'
import Meal from './components/meal/Meal'
import MealViewer from './components/meal/MealViewer'
import Form from './components/forms/Form'
import HoverTest from './components/experimental/HoverTest'
import { Router } from '@reach/router'
import DbManage from './components/admin/datastore/DbManage'


const App = () => {

    return (
      <div className={styles.App}>
        <div>
          <TopNav />
        </div>
          <Router>
            <Home path='/' />
            <Form path='form' />
            <Meal path='meal' />
            <MealViewer path='meals' />
            <HoverTest path='hovertest' />
            <DbManage path='manage-foods-db' />
            <DbManage path='manage-meals-db' />
          </Router>
      </div>
    )
}

export default App;
