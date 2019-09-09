import React from 'react';
import styles from './FoodDetails.module.css';

const FoodDetails = props => {
  const parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find(
      nutrient => nutrient.nutrient.name === name
    );
    return namedNutrient.amount;
  };

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
            {parseNutrients(props.foodDetails.foodNutrients, 'Energy')}
          </div>
          <div className={styles.cell}>
            {parseNutrients(props.foodDetails.foodNutrients, 'Protein')}
          </div>
          <div className={styles.cell}>
            {parseNutrients(
              props.foodDetails.foodNutrients,
              'Carbohydrate, by difference'
            )}
          </div>
          <div className={styles.cell}>
            {parseNutrients(
              props.foodDetails.foodNutrients,
              'Fiber, total dietary'
            )}
          </div>
          <div className={styles.cell}>
            {parseNutrients(
              props.foodDetails.foodNutrients,
              'Total lipid (fat)'
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodDetails;
