import React, { Component } from 'react';
import styles from './MealCalc.module.css';

class MealCalc extends Component {

  render(){
    return (
      <div className={styles.mealCalcContainer}>
        <div className={styles.titleBar}>title here</div>
        <div className={styles.row}>
          <div className={styles.headerCell} style={{width:'200px'}}>Item</div>
          <div className={styles.headerCell} style={{width:'100px'}}>Calories</div>
          <div className={styles.headerCell} style={{width:'100px'}}>Protein Grams</div>
          <div className={styles.headerCell} style={{width:'100px'}}>Carb Grams</div>
          <div className={styles.headerCell} style={{width:'100px'}}>Fat Grams</div>
        </div>
        <div className={styles.row}>
          <div className={styles.leadCell}>test</div>
          <div className={styles.cell}>1</div>
          <div className={styles.cell}>2</div>
          <div className={styles.cell}>3</div>
          <div className={styles.cell}>4</div>
        </div>
        <div className={styles.divider}></div>
      </div>
    );
  }
}

export default MealCalc;