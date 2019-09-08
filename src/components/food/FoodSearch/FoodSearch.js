import React, { Component } from 'react';
import { Button, Confirm, Input } from 'semantic-ui-react';
import retrieveFoodList from '../../../apis/retrieveFoodList';
import retrieveFoodItem from '../../../apis/retrieveFoodItem';
import FoodListTable from '../../table/FoodListTable/FoodListTable';
import FoodDetails from '../../food/FoodItem/FoodDetails';
import FoodDetailsModal from '../../modals/FoodDetailsModal';
import styles from './FoodSearch.module.css';

class FoodSearch extends Component {
  state = {
    loading: false,
    showConfirm: false,
    message: '',
    searchValue: '',
    foodList: [],
    activeFood: {},
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

  handleFoodSelect = (rowId, event) => {
    let updatedResults = this.state.foodList.map(foodItem => {
      let updatedFoodItem = { ...foodItem };
      updatedFoodItem.active = false;
      return updatedFoodItem;
    });
    updatedResults[rowId].active = true;
    retrieveFoodItem(updatedResults[rowId].fdcId).then(foodItem => {
      this.setState({
        foodList: updatedResults,
        activeFood: updatedResults[rowId],
        activeFoodDetails: foodItem,
        showModal: true
      });
    });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  retrieve = () => {
    retrieveFoodList(this.state.searchValue).then(apiSearchResults => {
      let foodList = [];
      let error = true;
      let message = 'No items found for search term.';
      let initialFoodList = apiSearchResults.foods;

      if (initialFoodList.length > 0) {
        error = false;
        message = '';
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
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <FoodDetailsModal
          show={this.state.showModal}
          onClose={this.toggleModal}
        >
          <FoodDetails foodDetails={this.state.activeFoodDetails} />
        </FoodDetailsModal>
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

export default FoodSearch;
