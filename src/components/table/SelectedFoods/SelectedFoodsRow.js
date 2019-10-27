import React from 'react';
import { Table } from 'semantic-ui-react';

const SelectedFoodsRow = props => {
  const rowClick = e => {
    const { onClick, rowId } = props;
    onClick(rowId, e);
  };

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{'100 grams'}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.calories}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.protein}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.carbohydrate}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fiber}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fat}</Table.Cell>
    </Table.Row>
  );
};

export default SelectedFoodsRow;
