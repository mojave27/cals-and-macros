import React from 'react';
import { Table } from 'semantic-ui-react';

const SelectedFoodsRow = props => {
  const rowClick = e => {
    const { onClick, rowId } = props;
    onClick(rowId, e);
  };

  const renderSelected = selected => {
    if (selected === 'true') {
      return (<span style={{fontWeight:'bold', color:'green'}}>{selected}</span>)
    }
    return (<span>{selected}</span>)
  }

  const parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find( nutrient => {
      return nutrient.nutrient.name === name
    });
    return namedNutrient ? namedNutrient.amount : 0
  }

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{'100 grams'}</Table.Cell>
      <Table.Cell>{parseNutrients(props.rowData.foodNutrients, 'Energy')}</Table.Cell>
      <Table.Cell>{parseNutrients(props.rowData.foodNutrients, 'Protein')}</Table.Cell>
      <Table.Cell>{parseNutrients(props.rowData.foodNutrients, 'Carbohydrate, by difference')}</Table.Cell>
      <Table.Cell>{parseNutrients(props.rowData.foodNutrients, 'Fiber, total dietary')}</Table.Cell>
      <Table.Cell>{parseNutrients(props.rowData.foodNutrients, 'Total lipid (fat)')}</Table.Cell>
    </Table.Row>
  );
};

export default SelectedFoodsRow;
