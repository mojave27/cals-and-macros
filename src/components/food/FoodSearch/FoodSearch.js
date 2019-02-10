import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import retrieveFoodList from '../../../apis/retrieveFoodList';
import FoodListTable from '../../table/FoodListTable/FoodListTable';
import styles from './FoodSearch.module.css';

class FoodSearch extends Component {
  state = {
    loading: false,
    showConfirm: false,
    message: '',
    searchValue: '',
    foodList: [],
    activeFood: {}
  };

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleClick = () => {
    this.setState({ loading: true });
    this.retrieve();
  };

  handleFoodSelect = (rowId, event) => {
    let updatedResults = this.state.foodList.map(foodItem => {
      let updatedFoodItem = { ...foodItem };
      updatedFoodItem.active = false;
      return updatedFoodItem;
    });
    updatedResults[rowId].active = true;
    this.setState({
      foodList: updatedResults,
      activeFood: updatedResults[rowId]
    });
  };

  retrieve = () => {
    retrieveFoodList(this.state.searchValue).then(apiSearchResults => {
      let foodList = [];
      let error = true;
      
      if (apiSearchResults.length > 0) {
        error = false;
        foodList = apiSearchResults.map(foodItem => {
          return {
            active: false,
            ...foodItem
          };
        });
      }

      this.setState({
        foodList: foodList,
        loading: false,
        showConfirm: error
      });
    });
  };

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
        />
        <br />
        <Button color='orange' onClick={this.handleClick} disabled={false}>
          search
        </Button>
        <br />
        {this.state.foodList.length > 0 ? (
          <FoodListTable
            foodList={this.state.foodList}
            rowClick={this.handleFoodSelect}
          />
        ) : null}
      </div>
    );
  }
}

export default FoodSearch;
