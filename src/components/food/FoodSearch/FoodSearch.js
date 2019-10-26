import React, { Component } from 'react';
import { Button, Confirm, Divider, Input } from 'semantic-ui-react';
import retrieveFoodList from '../../../apis/retrieveFoodList';
import retrieveFoodItem from '../../../apis/retrieveFoodItem';
import SelectedFoods from '../../table/SelectedFoods/SelectedFoods';
import FoodListTable from '../../table/FoodListTable/FoodListTable';
import FoodDetails from '../../food/FoodItem/FoodDetails';
import FoodDetailsModal from '../../modals/FoodDetailsModal';
import styles from './FoodSearch.module.css';
import { axiosFood } from '../../../config/apiConfig';
import AppContext from '../../context/appContext';

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
  };

  handleRowSelect = (rowId, event) => {
    event.preventDefault();
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

  selectFoodItem = event => {
    this.toggleModal();
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems;
      selectedFoodItems.push(prevState.activeFoodDetails);
      return { selectedFoodItems };
    });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  retrieve = () => {
    retrieveFoodList(this.state.searchValue)
      .then(apiSearchResults => {
        let foodList = [];
        let error = true;
        let message = 'No items found for search term.';
        let initialFoodList = apiSearchResults.foods;

        if (initialFoodList && initialFoodList.length > 0) {
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
      })
      .catch(error => {
        console.log(error);
      });
  };

  addToMeal = () => {
    // add selectedFoodItems to meal.
    console.log(this.state.selectedFoodItems)
    
  }

  addFoodtoApp = () => {
    const url = 'appdb'
    const foodToAdd = this.state.activeFoodDetails
    return axiosFood
    .post(url, foodToAdd)
    .then( response => {
      console.log(response)
    })
    .catch( error => {
      console.log(error)
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    return (
      <AppContext.Consumer>
      {({meal, updateMeal}) => (
        // <button
        //   onClick={toggleTheme}
        //   style={{backgroundColor: theme.background}}>
        //   Toggle Theme
        // </button>
      <div className={styles.container}>
        <div>meal: {meal.name}</div>
        <SelectedFoods
          foodList={this.state.selectedFoodItems}
          selectedFoodItems={this.state.selectedFoodItems}
          // rowClick={this.handleRowSelect}
          rowSelect={this.selectFoodItem}
        />
        <Button color='orange' onClick={this.addToMeal} disabled={false}>
          Add to Meal
        </Button>
        <Divider />
        <FoodDetailsModal
          show={this.state.showModal}
          onClose={this.toggleModal}
          onSelect={this.selectFoodItem}
          onAddToApp={this.addFoodtoApp}
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
          onKeyPress={this.handleKeyPress}
        />
        {/* <input ref='reference' onKeyPress={(e) => {(e.key === 'Enter' ? doSomething(this.refs.reference.value) : null)}} /> */}
        <br />
        <Button color='orange' onClick={this.handleClick} disabled={false}>
          search
        </Button>
        <br />
        {this.state.foodList.length > 0 ? (
          <FoodListTable
            foodList={this.state.foodList}
            selectedFoodItems={this.state.selectedFoodItems}
            rowClick={this.handleRowSelect}
            rowSelect={this.selectFoodItem}
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
      )}
    </AppContext.Consumer>
    );
  }
}

// FoodSearch.contextType = AppContext

export default FoodSearch
