import React, { Component } from 'react'
import { Button, Divider } from 'semantic-ui-react'
import MealTable from '../table/MealTable/MealTable'
import ReusableFoodSearch from '../food/FoodSearch/ReusableFoodSearch'
import styles from './Meal.module.css'

class Meal extends Component {
  state = {
    activeFood: {},
    foodList: [],
    loading: false,
    message: '',
    searchValue: '',
    showConfirm: false,
    showModal: false,
    showSearch: false
  }


  handleRowSelect = (rowId, event) => {
  }

  setActiveFood = (foodItem, foodDetails) => {
    const parsedFoodDetails = this.parseFood(foodDetails)
    this.setState({
      activeFood: foodItem, 
      activeFoodDetails: parsedFoodDetails
    })
  }

  /* export this section *********************************** */
  parseFood = food => {
    let parsedFood = {
      description: food.description,
      dataType: food.dataType,
      fdcId: food.fdcId,
      ndbNumber: food.ndbNumber,
      category: { ...food.foodCategory },
      nutrients: {
        calories: this.parseNutrients(food.foodNutrients, 'Energy'),
        protein: this.parseNutrients(food.foodNutrients, 'Protein'),
        carbohydrate: this.parseNutrients(food.foodNutrients, 'Carbohydrate, by difference'),
        fiber: this.parseNutrients(food.foodNutrients, 'Fiber, total dietary'),
        fat: this.parseNutrients(food.foodNutrients, 'Total lipid (fat)')
      }
    }
    return parsedFood
  }
  parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find( nutrient => {
      return nutrient.nutrient.name === name
    });
    return namedNutrient ? namedNutrient.amount : 0
  }
  /* ******************************************************** */

  addToMeal = event => {
    this.toggleSearch()
    this.setState(prevState => {
      let foodList = prevState.foodList;
      foodList.push(prevState.activeFoodDetails)
      return {foodList}
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
            foodList={this.state.foodList}
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
      </div>
    );
  }
}

export default Meal;
