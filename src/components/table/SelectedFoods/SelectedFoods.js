import React from "react";
import { Table } from "semantic-ui-react";
import SelectedFoodsRow from './SelectedFoodsRow';

const FoodListTable = props => {

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>description</Table.HeaderCell>
          <Table.HeaderCell>dataType</Table.HeaderCell>
          {/* <Table.HeaderCell>selected</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          // let found = props.selectedFoodItems.find( selectedFoodItem => {
          //   return selectedFoodItem.description === foodItem.description
          // })
          // let selected =  found ? 'true' : 'false';
          // console.log(`selected: ${selected}`)
          return(
            <SelectedFoodsRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onClick={props.rowClick}
              onSelect={props.rowSelect}
              // selected={selected}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
};

export default FoodListTable;
