import React from "react";
import { Table } from "semantic-ui-react";
import MealTableRow from './MealTableRow';

const MealTable = props => {

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>description</Table.HeaderCell>
          <Table.HeaderCell>cals</Table.HeaderCell>
          <Table.HeaderCell>protein grams</Table.HeaderCell>
          <Table.HeaderCell>carb grams</Table.HeaderCell>
          <Table.HeaderCell>fat grams</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          let found = props.selectedFoodItems.find( selectedFoodItem => {
            return selectedFoodItem.description === foodItem.description
          })
          let selected =  found ? true : false;
          console.log(`selected: ${selected}`)
          return(
            <MealTableRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onClick={props.rowClick}
              onSelect={props.rowSelect}
              selected={selected}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
};

export default MealTable;
