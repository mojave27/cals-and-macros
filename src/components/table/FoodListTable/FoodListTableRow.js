import React from 'react';
import { Table } from 'semantic-ui-react';

const FoodListTableRow = props => {
  const rowClick = e => {
    const { onClick, rowId } = props;
    onClick(rowId, e);
  };

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell>{props.rowData.ndbno}</Table.Cell>
      <Table.Cell>{props.rowData.name}</Table.Cell>
      <Table.Cell>{props.rowData.group}</Table.Cell>
    </Table.Row>
  );
};

export default FoodListTableRow;
