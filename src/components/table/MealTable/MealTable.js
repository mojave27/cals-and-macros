import React from "react";
import { Table } from "semantic-ui-react";
import SelectedFoodsRow from '../SelectedFoods/SelectedFoodsRow'

const MealTable = props => {
  return (
    <Table compact celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>description</Table.HeaderCell>
          <Table.HeaderCell>Qty/Unit</Table.HeaderCell>
          <Table.HeaderCell>Cals</Table.HeaderCell>
          <Table.HeaderCell>Protein Grams</Table.HeaderCell>
          <Table.HeaderCell>Carb Grams</Table.HeaderCell>
          <Table.HeaderCell>Fiber Grams</Table.HeaderCell>
          <Table.HeaderCell>Fat Grams</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          return(
            <SelectedFoodsRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onClick={props.rowClick}
              onSelect={props.rowSelect}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
};

export default MealTable;
