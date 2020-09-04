import React, { Component } from 'react'
import { Button, Divider, Input } from 'semantic-ui-react'
import MealTable from '../table/MealTable/MealTable'
import ReusableFoodSearch from '../food/FoodSearch/ReusableFoodSearch'
import saveMeal from '../../apis/saveMeal'
import styles from './Meal.module.css'
import { findIndexOfId } from '../util/ArrayUtils'
import { cloneDeep } from 'lodash'

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '2px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  width: '1.2em',
  fontWeight: '700',
  lineHeight: '1em',
  margin: '4px 4px',
  borderRadius: '50%'
}

class Meal extends Component {
  state = {
    activeFood: {},
    loading: false,
    meal: {
      foodList: [],
      name: ''
    },
    tweakValue: 0,
    message: '',
    searchValue: '',
    selectedFoodItems: [],
    showSearch: false
  }

  tweakUp = () => {
    this.setState(prevState => {
      let newTweakValue = prevState.tweakValue + 1
      return { tweakValue: newTweakValue }
    })
  }

  tweakDown = () => {
    this.setState(prevState => {
      let newTweakValue = prevState.tweakValue - 1
      return { tweakValue: newTweakValue }
    })
  }

  tweakRowUp = id => {
    this.setState(prevState => {
      let updatedMeal = prevState.meal
      const index = findIndexOfId(id, updatedMeal.foodList)
      let multiplier = (Number(updatedMeal.foodList[index].quantity) + 1) / Number(updatedMeal.foodList[index].quantity)

      let foodItem = cloneDeep(updatedMeal.foodList[index])

      foodItem.quantity = Number(foodItem.quantity) + 1
  
      let updatedFoodItem = this.updateNutrients(foodItem, multiplier)
      updatedMeal.foodList[index] = updatedFoodItem
      return { meal: updatedMeal }
    })
  }

  tweakRowDown = id => {
    this.setState(prevState => {
      let updatedMeal = prevState.meal
      const index = findIndexOfId(id, updatedMeal.foodList)
      let multiplier = (Number(updatedMeal.foodList[index].quantity) - 1) / Number(updatedMeal.foodList[index].quantity)

      let foodItem = cloneDeep(updatedMeal.foodList[index])

      foodItem.quantity = Number(foodItem.quantity) - 1
  
      let updatedFoodItem = this.updateNutrients(foodItem, multiplier)
      updatedMeal.foodList[index] = updatedFoodItem
      return { meal: updatedMeal }
    })
  }

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems
      selectedFoodItems.push(prevState.foodList[rowId])
      return { selectedFoodItems }
    })
  }


  /* ******************************************************** */

  addToMeal = foodItem => {
    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList.push(foodItem)
      return { meal }
    })
  }

  saveTheMeal = () => {
    saveMeal(this.state.meal)
      .then(response => {
        console.log(response)
        this.setState({ meal: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateMealName = name => {
    let meal = this.state.meal
    meal.name = name
    this.setState({ meal })
  }

  toggleSearch = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch }
    })
  }

  toggleMealModal = () => {
    this.setState(prevState => {
      return { showMealModal: !prevState.showMealModal }
    })
  }

  handleInputChange = event => {
    let name = event.target.value
    this.setState(prevState => {
      let meal = prevState.meal
      meal.name = name
      return { meal }
    })
  }

  convertNutrient = (nutrient, multiplier) => {
    return Math.round(nutrient * multiplier * 100) / 100
  }

  handleQuantityChange = (event, data) => {
    let quantity = data
    let id = event.target.id
    let foodItemIndex = this.state.meal.foodList.findIndex(
      food => Number(food.id) === Number(id)
    )
    let foodItem = cloneDeep(this.state.meal.foodList[foodItemIndex])

    let multiplier = quantity / foodItem.quantity
    foodItem.quantity = quantity

    let updatedFoodItem = this.updateNutrients(foodItem, multiplier)

    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList[foodItemIndex] = updatedFoodItem
      return { meal }
    })
  }

  updateNutrients = (foodItem, multiplier) => {
    return {
      ...foodItem,
      calories: Math.ceil(foodItem.calories * multiplier * 100) / 100,
      proteinGrams: Math.ceil(foodItem.proteinGrams * multiplier * 100) / 100,
      carbGrams: Math.ceil(foodItem.carbGrams * multiplier * 100) / 100,
      fiberGrams: Math.ceil(foodItem.fiberGrams * multiplier * 100) / 100,
      // netCarbs: Math.ceil(foodItem.netCarbs * multiplier * 100) / 100,
      fatGrams: Math.ceil(foodItem.fatGrams * multiplier * 100) / 100
    }
  }

  deleteRow = event => {
    let id = event.target.id
    let index = findIndexOfId(id, this.state.meal.foodList)
    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList.splice(index, 1)
      return { meal }
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          label={'meal name'}
          value={this.state.meal.name}
          onChange={this.handleInputChange}
        />
        <div>
          <button style={buttonStyle} onClick={this.tweakDown}>
            -
          </button>
          {this.state.tweakValue}
          <button style={buttonStyle} onClick={this.tweakUp}>
            +
          </button>
        </div>
        <MealTable
          foodList={this.state.meal.foodList}
          rowClick={this.handleRowSelect}
          rowSelect={this.selectFoodItem}
          rowDelete={this.deleteRow}
          onQuantityChange={this.handleQuantityChange}
          tweakUp={this.tweakRowUp}
          tweakDown={this.tweakRowDown}
        />
        <Button color='orange' onClick={this.toggleSearch}>
          Add Item
        </Button>
        <Button color='green' onClick={this.saveTheMeal}>
          Save Meal
        </Button>

        <Divider />

        {this.state.showSearch ? (
          <ReusableFoodSearch
            onClose={this.toggleSearch}
            rowSelect={this.addToMeal}
            setActiveFood={this.setActiveFood}
            activeFood={this.state.activeFood}
            activeFoodDetails={this.state.activeFoodDetails}
          />
        ) : null}
      </div>
    )
  }
}

export default Meal
