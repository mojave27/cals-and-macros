import React from 'react';
import { Input, Table } from 'semantic-ui-react';

const SelectedFoodsRow = props => {
  const rowClick = e => {
    const { onClick, rowId } = props;
    onClick(rowId, e);
  };

  // const handleDropdownChange = (event, data) => {
  //   console.log(event.target.value);
  //   console.log(data);
  // };

  // const options = [
  //   { key: 0, text: 'grams', value: 0, onClick: handleDropdownChange },
  //   { key: 1, text: 'ounces', value: 1, onClick: handleDropdownChange },
  //   { key: 2, text: 'whole', value: 2, onClick: handleDropdownChange }
  // ];

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>
        <Input 
          defaultValue={props.rowData.quantity} 
          onChange={props.onQuantityChange}
          id={props.rowData.fdcId}
        />
      </Table.Cell>
      <Table.Cell>{'grams'}</Table.Cell>
      {/* <Table.Cell>
        <Dropdown
          placeholder='placeholder'
          fluid
          selection
          options={options}
          onChange={handleDropdownChange}
          onClick={handleDropdownChange}
          scrolling
        />
      </Table.Cell> */}
      <Table.Cell>{props.rowData.nutrients.calories}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.protein}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.carbohydrate}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fiber}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fat}</Table.Cell>
    </Table.Row>
  );
};

export default SelectedFoodsRow;
