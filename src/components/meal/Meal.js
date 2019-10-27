import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import MealTable from '../table/MealTable/MealTable';
import ReusableFoodSearch from '../food/FoodSearch/ReusableFoodSearch'
// import FoodDetails from '../../food/FoodItem/FoodDetails';
// import FoodDetailsModal from '../../modals/FoodDetailsModal';
import styles from './Meal.module.css';

class Meal extends Component {
  state = {
    activeFood: {},
    foodList: [],
    loading: false,
    message: '',
    searchValue: '',
    selectedFoodItems:[],
    showConfirm: false,
    showModal: false,
    showSearch: false
  };

  handleModalCancel = () => {
    this.setState({ showConfirm: false });
  };
  handleModalConfirm = () => {
    this.setState({ showConfirm: false });
  };

  handleModalCancel = () => { this.setState({showConfirm: false}) }
  handleModalConfirm = () => { this.setState({showConfirm: false}) }

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleClick = () => {
    this.setState({ loading: true });
    this.retrieve();
  };

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    let updatedResults = this.state.foodList.map(foodItem => {
      let updatedFoodItem = { ...foodItem };
      updatedFoodItem.active = false;
      return updatedFoodItem;
    });
    updatedResults[rowId].active = true;
  };

  setActiveFood = (foodItem, foodDetails) => {
    this.setState({
      activeFood: foodItem, 
      activeFoodDetails: foodDetails
    })
  }

  addToMeal = event => {
    this.toggleSearch()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems;
      selectedFoodItems.push(prevState.activeFoodDetails)
      return {selectedFoodItems}
    })
  }

  toggleSearch = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch };
    });
  }


  render() {
    return (
      <div className={styles.container}>
          <MealTable
            foodList={this.state.selectedFoodItems}
            rowClick={this.handleRowSelect}
            rowSelect={this.selectFoodItem}
          />
        <Button color='orange' onClick={this.toggleSearch} >
          Add Item
        </Button>
        <Divider />
        {this.state.showSearch
         ? 
          <ReusableFoodSearch 
            addToMeal={this.addToMeal}
            setActiveFood={this.setActiveFood}
            activeFood={this.state.activeFood}
            activeFoodDetails={this.state.activeFoodDetails}
          />
         : null
        }
        {/* <Confirm 
            open={this.state.showConfirm} 
            onCancel={this.handleModalCancel} 
            onConfirm={this.handleModalConfirm} 
            content={this.state.message}
            size='tiny'
        /> */}
      </div>
    );
  }
}

export default Meal;
