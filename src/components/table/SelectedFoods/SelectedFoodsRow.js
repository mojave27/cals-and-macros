import React from 'react';
import { Table } from 'semantic-ui-react';

const FoodListTableRow = props => {
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

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      {/* <Table.Cell>{props.rowData.fdcId}</Table.Cell> */}
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.dataType}</Table.Cell>
      {/* <Table.Cell>{renderSelected(props.selected)}</Table.Cell> */}
      {/* <Table.Cell selectable={false}><Checkbox className={'checkbox'} toggle onClick={props.onSelect} checked={props.selected} /></Table.Cell> */}
    </Table.Row>
  );
};

export default FoodListTableRow;
