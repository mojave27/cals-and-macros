import React from "react";
import { Table } from "semantic-ui-react";
import FoodListTableRow from './FoodListTableRow';

const FoodListTable = props => {

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ndbno</Table.HeaderCell>
          <Table.HeaderCell>name</Table.HeaderCell>
          <Table.HeaderCell>group</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          return(
            <FoodListTableRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onClick={props.rowClick}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
};

export default FoodListTable;
