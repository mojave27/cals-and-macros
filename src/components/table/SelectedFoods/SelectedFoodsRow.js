import React, { useState } from 'react'
import { Input, Table } from 'semantic-ui-react'

const SelectedFoodsRow = props => {
  let [ units, setUnits ] = useState('grams')

  const rowClick = e => {
    const { onClick, rowId } = props
    onClick(rowId, e)
  }

  const handleDropdownChange = event => {
    console.log(event.target.value)
    let newUnits = event.target.value
    setUnits(newUnits)
  }

  const calcDefaultValue = qty => {
    let updatedQty = qty
    if (units === 'ounces') {
      updatedQty = qty/28.35
      updatedQty = updatedQty * 100
      let returnNum = Math.ceil(updatedQty)
      updatedQty = returnNum / 100
    }
    return updatedQty
  }

  const handleQtyChange = event => {
    let value = event.target.value
    console.log(`value before: ${value}`) 
    if(units === 'ounces') {
      value = value * 28.35
    }
    console.log(`value after: ${value}`) 
    props.onQuantityChange(event, value)
  }

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell id={props.rowId} onClick={props.rowDelete}>
        {'X'}
      </Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>
        <Input
          // defaultValue={calcDefaultValue(props.rowData.quantity)}
          value={calcDefaultValue(props.rowData.quantity)}
          // onChange={props.onQuantityChange}
          onChange={handleQtyChange}
          id={props.rowData.fdcId}
        />
      </Table.Cell>
      {/* <Table.Cell>{'grams'}</Table.Cell> */}
      <Table.Cell>
        <select id='units' onChange={handleDropdownChange}>
          <option value='grams'>grams</option>
          <option value='ounces'>ounces</option>
          {/* <option value='whole'>whole</option> */}
        </select>
      </Table.Cell>
      <Table.Cell>{props.rowData.nutrients.calories}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.protein}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.carbohydrate}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fiber}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.netCarbs}</Table.Cell>
      <Table.Cell>{props.rowData.nutrients.fat}</Table.Cell>
    </Table.Row>
  )
}

export default SelectedFoodsRow
