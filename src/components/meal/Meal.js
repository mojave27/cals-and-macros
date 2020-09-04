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

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems
      selectedFoodItems.push(prevState.foodList[rowId])
      return { selectedFoodItems }
    })
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
    let carbohydrate = this.parseNutrients(
      food.foodNutrients,
      'Carbohydrate, by difference'
    )
    let fiber = this.parseNutrients(food.foodNutrients, 'Fiber, total dietary')

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
        carbohydrate: carbohydrate,
        fiber: fiber,
        netCarbs: carbohydrate - fiber,
        fat: this.parseNutrients(food.foodNutrients, 'Total lipid (fat)')
      }
    }
    return parsedFood
  }

  parseNutrients = (nutrients, name) => {
    let namedNutrient = nutrients.find(nutrient => {
      return nutrient.nutrient.name === name
    })
    // console.log(namedNutrient)
    let returnValue = namedNutrient ? namedNutrient.amount : 0
    console.log(returnValue)
    return namedNutrient ? namedNutrient.amount : 0
  }
  /* ******************************************************** */

  addToMeal = (foodItem) => {
    // this.toggleSearch()
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
    console.log(`data`)
    console.log(data)
    // let quantity = event.target.value
    let quantity = data
    let id = event.target.id
    let foodItemIndex = this.state.meal.foodList.findIndex(
      food => Number(food.fdcId) === Number(id)
    )
    let foodItem = cloneDeep(this.state.meal.foodList[foodItemIndex])
    let multiplier = quantity / foodItem.quantity

    foodItem.quantity = quantity

    let updatedNutrients = this.updateNutrients(foodItem.nutrients, multiplier)
    foodItem.nutrients = { ...updatedNutrients }

    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList[foodItemIndex] = foodItem
      return { meal }
    })
  }

  changeAllQuantities = () => {}

  updateNutrients = (nutrients, multiplier) => {
    return {
      // calories: Math.ceil(num * 100) / 100
      calories: Math.ceil(nutrients.calories * multiplier * 100) / 100,
      protein: Math.ceil(nutrients.protein * multiplier * 100) / 100,
      carbohydrate: Math.ceil(nutrients.carbohydrate * multiplier * 100) / 100,
      fiber: Math.ceil(nutrients.fiber * multiplier * 100) / 100,
      netCarbs: Math.ceil(nutrients.netCarbs * multiplier * 100) / 100,
      fat: Math.ceil(nutrients.fat * multiplier * 100) / 100
    }
  }

  deleteRow = (event) => {
    let id = event.target.id
    let index = findIndexOfId(id, this.state.meal.foodList)
    this.setState( prevState => {
      let meal = prevState.meal
      meal.foodList.splice(index,1)
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
