import React from 'react';
import styles from '../../MealCalc/MealCalc.module.css';

const FoodDetails = props => {

  const parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find(nutrient => nutrient.nutrient.name === name)
    return namedNutrient.amount
  }

/* foodNutrients: Array(65)
    0:
    amount: 1.09 <-- amount of this nutrient per 100g
    id: 2643067
    nutrient:
     id: 1003
     name: "Protein" <-- the nutrient type
     number: "203"
     rank: 600
     unitName: "g"
*/

  return (
    <React.Fragment>
      <div className={styles.titleBar}>{props.foodDetails.description}</div>
      <div className={styles.cell}>Qty/Unit</div>
      <div className={styles.cell}>100 grams</div>
      <div className={styles.cell}>Cals</div>
      <div className={styles.cell}>{parseNutrients(props.foodDetails.foodNutrients, "Energy")}</div>

      <div className={styles.cell}>Protein Grams</div>
      <div className={styles.cell}>{parseNutrients(props.foodDetails.foodNutrients, "Protein")}</div>

      <div className={styles.cell}>Carb Grams</div>
      <div className={styles.cell}>{parseNutrients(props.foodDetails.foodNutrients, "Carbohydrate, by difference")}</div>

      <div className={styles.cell}>Fiber Grams</div>
      <div className={styles.cell}>{parseNutrients(props.foodDetails.foodNutrients, "Fiber, total dietary")}</div>

      <div className={styles.cell}>Fat Grams</div>
      <div className={styles.cell}>{parseNutrients(props.foodDetails.foodNutrients, "Total lipid (fat)")}</div>
    </React.Fragment>
  );
};

export default FoodDetails;
