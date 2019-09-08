import React from 'react';
import styles from '../../MealCalc/MealCalc.module.css';

const FoodItem = props => {
  return (
    <React.Fragment>
      <div className={styles.cell}>{props.food.item}</div>
      <div className={styles.cell}>{props.food.quantity}</div>
      <div className={styles.cell}>{props.food.unit}</div>
      <div className={styles.cell}>{props.food.calories}</div>
      <div className={styles.cell}>{props.food.pgrams}</div>
      <div className={styles.cell}>{props.food.cgrams}</div>
      <div className={styles.cell}>{props.food.fgrams}</div>
    </React.Fragment>
  );
};

export default FoodItem;
