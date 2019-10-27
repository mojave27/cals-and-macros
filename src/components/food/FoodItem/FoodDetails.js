import React from 'react';
import styles from './FoodDetails.module.css';

const FoodDetails = props => {

  return (
    <React.Fragment>
      <div className={styles.titleBar}>{props.foodDetails.description}</div>
      <div className={styles.foodDetailsContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.leadCell}>Qty/Unit</div>
          <div className={styles.leadCell}>Cals</div>
          <div className={styles.leadCell}>Protein Grams</div>
          <div className={styles.leadCell}>Carb Grams</div>
          <div className={styles.leadCell}>Fiber Grams</div>
          <div className={styles.leadCell}>Fat Grams</div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.cell}>100 grams</div>
          <div className={styles.cell}>
            {props.foodDetails.nutrients.calories}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.nutrients.protein}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.nutrients.carbohydrate}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.nutrients.fiber}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.nutrients.fat}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodDetails;
