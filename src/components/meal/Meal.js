import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import MealTable from '../table/MealTable/MealTable';
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
    showModal: false
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

  selectFoodItem = event => {
    this.toggleModal()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems;
      selectedFoodItems.push(prevState.activeFoodDetails)
      return {selectedFoodItems}
    })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };


  render() {
    return (
      <div className={styles.container}>
        {/* <FoodDetailsModal
          show={this.state.showModal}
          onClose={this.toggleModal}
          onSelect={this.selectFoodItem}
        >
          <FoodDetails foodDetails={this.state.activeFoodDetails} />
        </FoodDetailsModal> 
        <Button color='orange' onClick={this.handleClick} disabled={false}>
          search
        </Button>*/}
        <br />
          <MealTable
            foodList={this.state.foodList}
            selectedFoodItems={this.state.selectedFoodItems}
            rowClick={this.handleRowSelect}
            rowSelect={this.selectFoodItem}
          />
        <Button color='orange' onClick={this.addFood} >
          Add Item
        </Button>
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
