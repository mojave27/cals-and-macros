import React from "react";
import { Table } from "semantic-ui-react";
import SelectedFoodsRow from './SelectedFoodsRow';

const SelectedFoods = props => {

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>delete</Table.HeaderCell>
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
        {props.foodList.map( (foodItem, index) => {
          return(
            <SelectedFoodsRow
              key={index}
              rowId={index}
              rowData={foodItem}
              rowDelete={props.rowDelete}
              rowSelect={props.rowSelect}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
};

export default SelectedFoods;
