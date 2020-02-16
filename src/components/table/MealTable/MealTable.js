import React from 'react';
import { Table } from 'semantic-ui-react';
import SelectedFoodsRow from '../SelectedFoods/SelectedFoodsRow';

const MealTable = props => {
  return (
    <Table compact celled selectable >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>description</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>Cals</Table.HeaderCell>
          <Table.HeaderCell>Protein Grams</Table.HeaderCell>
          <Table.HeaderCell>Carb Grams</Table.HeaderCell>
          <Table.HeaderCell>Fiber Grams</Table.HeaderCell>
          <Table.HeaderCell>Fat Grams</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map((foodItem, index) => {
          return (
            <SelectedFoodsRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onClick={props.rowClick}
              onSelect={props.rowSelect}
              onQuantityChange={props.onQuantityChange}
            />
          );
        })}
      </Table.Body>
      {props.foodList.length > 0
        ? <Table.Footer>
            <SummaryRow foodList={props.foodList} />
            <MacrosRow foodList={props.foodList} />
          </Table.Footer>
        : null
      }
    </Table>
  );
};

const SummaryRow = props => {
  const sumIt = nutrientName => {
    let allVals = props.foodList.map(foodItem => {
      return foodItem.nutrients[nutrientName];
    });
    var sum = allVals.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    return sum;
  };

  return (
    <Table.Row>
      <Table.HeaderCell colSpan={3}>{'Totals'}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('calories')}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('protein')}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('carbohydrate')}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('fiber')}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('fat')}</Table.HeaderCell>
    </Table.Row>
  );
};

const MacrosRow = props => {
  // props should include the nutrient name
  let calsPerGram = new Map([['protein', 4], ['carbohydrate', 4], ['fat', 9]]);

  /* this is same fx as 'sumIt' */
  const sumCals = () => {
    let allCals = props.foodList.map(foodItem => {
      return foodItem.nutrients.calories;
    });
    var sum = allCals.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    return sum.toFixed(1);
  };

  const percentIt = nutrientName => {
    const totalCals = sumCals();
    let allVals = props.foodList.map(foodItem => {
      return foodItem.nutrients[nutrientName];
    });
    var sum = allVals.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    const percentage = (sum.toFixed(2) * calsPerGram.get(nutrientName)) / totalCals;
    return isNaN(percentage) ? 0 : (percentage.toFixed(2) * 100);
  };

  return (
      <Table.Row>
        <Table.HeaderCell colSpan={4} >{'Macro Breakdown'}</Table.HeaderCell>
        <Table.HeaderCell>{percentIt('protein')} %</Table.HeaderCell>
        <Table.HeaderCell>{percentIt('carbohydrate')} %</Table.HeaderCell>
        <Table.HeaderCell>0 %</Table.HeaderCell>
        <Table.HeaderCell>{percentIt('fat')} %</Table.HeaderCell>
      </Table.Row>
  );
};

export default MealTable;
