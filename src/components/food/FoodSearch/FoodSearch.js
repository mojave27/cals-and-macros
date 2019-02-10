import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import retrieveFoodList from '../../../apis/retrieveFoodList';
import FoodListTable from '../../table/FoodListTable/FoodListTable';
import styles from './FoodSearch.module.css';

class FoodSearch extends Component {
  state = {
    loading: false,
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
    console.log(`selected row data: ${JSON.stringify(rowId)}`)
    this.setActiveRow(rowId);
  }

  setActiveRow(rowId){
      let updatedResults = this.state.foodList.map(foodItem => {
          let updatedFoodItem = {...foodItem}
          updatedFoodItem.active = false;
          return updatedFoodItem;
      });
    //   console.log(`updatedResults[${rowId}]: ${JSON.stringify(updatedResults[rowId])}`)
      updatedResults[rowId].active = true;
      this.setState({
          foodList: updatedResults,
          activeFood: updatedResults[rowId]
      })
  }

  retrieve = () => {
    retrieveFoodList(this.state.searchValue).then(apiSearchResults => {
       let foodList = apiSearchResults.map(foodItem => {
        return {
          active: false,
          ...foodItem
        };
      });
      this.setState({
        foodList: foodList,
        loading: false
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
