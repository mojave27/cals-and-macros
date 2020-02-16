import React, { Component } from 'react';
import { Button, Divider, Dropdown, Input } from 'semantic-ui-react';
import MealTable from '../table/MealTable/MealTable';
import ReusableFoodSearch from '../food/FoodSearch/ReusableFoodSearch';
import saveMeal from '../../apis/saveMeal';
import styles from './Meal.module.css';

class Meal extends Component {
  state = {
    activeFood: {},
    loading: false,
    meal: {
      foodList: [],
      name: ''
    },
    message: '',
    searchValue: '',
    showConfirm: false,
    showModal: false,
    showSearch: false
  };

  handleRowSelect = (rowId, event) => {};

  setActiveFood = (foodItem, foodDetails) => {
    const parsedFoodDetails = this.parseFood(foodDetails);
    this.setState({
      activeFood: foodItem,
      activeFoodDetails: parsedFoodDetails
    });
  };

  /* export this section *********************************** */
  parseFood = food => {
    let parsedFood = {
      quantity: 100,
      unit: 'grams',
      description: food.description,
      dataType: food.dataType,
      fdcId: food.fdcId,
      ndbNumber: food.ndbNumber,
      category: { ...food.foodCategory },
      nutrients: {
        calories: this.parseNutrients(food.foodNutrients, 'Energy'),
        protein: this.parseNutrients(food.foodNutrients, 'Protein'),
        carbohydrate: this.parseNutrients(
          food.foodNutrients,
          'Carbohydrate, by difference'
        ),
        fiber: this.parseNutrients(food.foodNutrients, 'Fiber, total dietary'),
        fat: this.parseNutrients(food.foodNutrients, 'Total lipid (fat)')
      }
    };
    return parsedFood;
  };
  parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find(nutrient => {
      return nutrient.nutrient.name === name;
    });
    return namedNutrient ? namedNutrient.amount : 0;
  };
  /* ******************************************************** */

  addToMeal = () => {
    this.toggleSearch();
    this.setState(prevState => {
      let meal = prevState.meal;
      meal.foodList.push(prevState.activeFoodDetails);
      return { meal };
    });
  };

  saveMeal = () => {
    saveMeal(this.state.meal)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateMealName = name => {
    let meal = this.state.meal
  }

  toggleSearch = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch };
    });
  };

  toggleMealModal = () => {
    this.setState(prevState => {
      return { showMealModal: !prevState.showMealModal };
    });
  }

  handleInputChange = event => {
    let name = event.target.value
    this.setState(prevState => {
      let meal = prevState.meal
      meal.name = name
      return { meal }
    });
  };

  handleQuantityChange = (event, data) => {
    let quantity = event.target.value
    console.log(data)
    console.log(quantity)
    // get the foodItem from foodList by fdcId (can be found in data.fdcId)

    // update the value of foodList item quantity

    // set it all back into state
    // this.setState()
  }

  // handleDropdownChange = (event,data) => {
  //   console.log(event)
  //   console.log(data)
  // }

  // ddOptions = [
  //   { key: 0, text: 'grams', value: 0, onClick: this.handleDropdownChange },
  //   { key: 1, text: 'ounces', value: 1, onClick: this.handleDropdownChange },
  //   { key: 2, text: 'whole', value: 2, onClick: this.handleDropdownChange }
  // ];

  render() {
    return (
      <div className={styles.container}>
        {/* <Dropdown
          placeholder='placeholder'
          fluid
          selection
          options={this.ddOptions}
          onChange={this.handleDropdownChange}
          onClick={this.handleDropdownChange}
          scrolling
        />   */}
        <Input 
          label={'meal name'}
          value={this.state.meal.name} 
          onChange={this.handleInputChange}
        />
        <MealTable
          foodList={this.state.meal.foodList}
          rowClick={this.handleRowSelect}
          rowSelect={this.selectFoodItem}
          onQuantityChange={this.handleQuantityChange}
        />
        <Button color='orange' onClick={this.toggleSearch}>
          Add Item
        </Button>
        <Button color='green' onClick={this.saveMeal}>
          Save Meal
        </Button>

        <Divider />

        {this.state.showSearch ? (
          <ReusableFoodSearch
            addToMeal={this.addToMeal}
            setActiveFood={this.setActiveFood}
            activeFood={this.state.activeFood}
            activeFoodDetails={this.state.activeFoodDetails}
          />
        ) : null}
      </div>
    );
  }
}

export default Meal;
