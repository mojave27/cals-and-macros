import React, { Component } from 'react';
import styles from './MealCalc.module.css';
import FoodItem from '../food/FoodItem/FoodItem';

const foodItems = [
  {
    item: 'egg, large',
    quantity: 1,
    unit: 1,
    calories: 71,
    pgrams: 6,
    cgrams: 0,
    fgrams: 5
  },
  {
    item: 'applegate chicken and sage sausage',
    quantity: 1,
    unit: 3,
    calories: 110,
    pgrams: 9,
    cgrams: 1,
    fgrams: 8
  }
];

class MealCalc extends Component {

  state = {foodItems: foodItems}

  render() {
    return (
      <div className={styles.mealCalcContainer}>
        <div className={styles.titleBar}>title here</div>
        <div className={styles.row}>
          <div className={styles.headerCell}> Item </div>
          <div className={styles.headerCell}> Quantity </div>
          <div className={styles.headerCell}> Unit </div>
          <div className={styles.headerCell}> Calories </div>
          <div className={styles.headerCell}> Protein Grams </div>
          <div className={styles.headerCell}> Carb Grams </div>
          <div className={styles.headerCell}> Fat Grams </div>
        </div>
        {this.state.foodItems.map(food => {
          return (
            <div key={food.item} className={styles.row}>
              <FoodItem food={food}/>
            </div>
          );
        })}
        <div className={styles.divider} />

        <div className={styles.row}>
          <div className={styles.cell}>meal items combined here</div>
          <div className={styles.cell}>cals sum here</div>
          <div className={styles.cell}>pg sum here</div>
          <div className={styles.cell}>cg sum here</div>
          <div className={styles.cell}>fg sum here</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>test</div>
          <div className={styles.cell}>cals sum here</div>
          <div className={styles.cell}>pcal sum here</div>
          <div className={styles.cell}>ccal sum here</div>
          <div className={styles.cell}>fcal sum here</div>
        </div>
      </div>
    );
  }
}

export default MealCalc;
