import React, { Component } from 'react';
import { Button, Confirm, Input } from 'semantic-ui-react';
import retrieveFoodList from '../../../apis/retrieveFoodList';
import FoodListTable from '../../table/FoodListTable/FoodListTable';
import styles from './FoodSearch.module.css';
import { findIndexOfId, removeItemFromArrayByIndex } from '../../util/ArrayUtils'

class FoodSearch extends Component {
  state = {
    activeFood: {},
    foodList: [],
    loading: false,
    message: '',
    searchValue: '',
    selectedFoodItems: [],
    showConfirm: false,
    showModal: false
  };

  handleModalCancel = () => {
    this.setState({ showConfirm: false });
  };
  handleModalConfirm = () => {
    this.setState({ showConfirm: false });
  };

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleClick = () => {
    this.setState({ loading: true });
    this.retrieve();
  }

  handleRowDelete = event => {
    const id = event.target.id
    console.log(`id: ${id}`)
    const index = findIndexOfId(id, this.state.selectedFoodItems)
    console.log(`deleting ${JSON.stringify(this.state.selectedFoodItems[index])}`)
    this.setState(prevState => {
      console.log(prevState.selectedFoodItems)
      let newSelectedItems = removeItemFromArrayByIndex(index, prevState.selectedFoodItems)
      console.log(newSelectedItems)
      return({selectedFoodItems: newSelectedItems})
    })
  }

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    this.props.rowSelect(this.state.foodList[rowId])
  }

  retrieve = () => {
    retrieveFoodList(this.state.searchValue)
      .then(apiSearchResults => {
        let foodList = [];
        let error = true;
        let message = 'No items found for search term.';
        let initialFoodList = apiSearchResults

        if (initialFoodList && initialFoodList.length > 0) {
          error = false
          message = ''
          foodList = initialFoodList.map(foodItem => {
            return {
              active: false,
              ...foodItem
            };
          });
        }

        this.setState({
          foodList: foodList,
          loading: false,
          showConfirm: error,
          message: message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          loading={this.state.loading}
          icon='search'
          iconPosition='left'
          placeholder='search...'
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          className={styles.searchInput}
          onKeyPress={this.handleKeyPress}
        />
        <br />
        <Button color='orange' onClick={this.handleClick} disabled={false}>
          search
        </Button>
        <Button color='red' onClick={this.props.onClose}>close</Button>
        <br />
        {this.state.foodList.length > 0 ? (
          <React.Fragment>
          <FoodListTable
            foodList={this.state.foodList}
            selectedFoodItems={this.state.selectedFoodItems}
            rowClick={this.handleRowSelect}
            rowSelect={this.selectFoodItem}
          />
          </React.Fragment>
        ) : null}
        <Confirm
          open={this.state.showConfirm}
          onCancel={this.handleModalCancel}
          onConfirm={this.handleModalConfirm}
          content={this.state.message}
          size='tiny'
        />
      </div>
    );
  }
}

export default FoodSearch
