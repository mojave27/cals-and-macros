import React from 'react'
import styles from './FoodDetails.module.css'
import { get } from 'lodash'

const FoodDetails = props => {

  const debugStuff = foodDetails => {
    console.log(JSON.stringify(foodDetails))
    return (<div>{''}</div>)
  }

  return (
    <React.Fragment>
      <div className={styles.titleBar}>{props.foodDetails.description}</div>
      {debugStuff(props.foodDetails)}
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
            {props.foodDetails.calories}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.proteinGrams}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.carbGrams}
          </div>
          <div className={styles.cell}>
            {get(props, 'foodDetails.fiber', 0)}
          </div>
          <div className={styles.cell}>
            {props.foodDetails.fatGrams}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodDetails;
