import React, { Component } from 'react'
import { Button, Confirm, Divider, Input } from 'semantic-ui-react'
import retrieveFoodList from '../../../apis/retrieveFoodList'
import retrieveFoodItem from '../../../apis/retrieveFoodItem'
import SelectedFoods from '../../table/SelectedFoods/SelectedFoods'
import FoodListTable from '../../table/FoodListTable/FoodListTable'
import FoodDetails from '../../food/FoodItem/FoodDetails'
import FoodDetailsModal from '../../modals/FoodDetailsModal'
import styles from './FoodSearch.module.css'
import { axiosFood } from '../../../config/apiConfig'
import AppContext from '../../context/appContext'
import { findIndexOfId, removeItemFromArrayByIndex } from '../../util/ArrayUtils'

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
  }

  handleModalCancel = () => {
    this.setState({ showConfirm: false })
  }
  handleModalConfirm = () => {
    this.setState({ showConfirm: false })
  }

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleSearchClick = () => {
    this.setState({ loading: true })
    this.retrieve()
  }

  handleRowDelete = event => {
    // console.log(event.target.id)
    const id = event.target.id
    console.log(`id: ${id}`)
    const index = findIndexOfId(id, this.state.selectedFoodItems)
    console.log(`deleting ${JSON.stringify(this.state.selectedFoodItems[index])}`)
    this.setState(prevState => {
      console.log(prevState.selectedFoodItems)
      let newSelectedItems = removeItemFromArrayByIndex(index, prevState.selectedFoodItems)
      console.log(newSelectedItems)
      return({selectedFoodItems: newSelectedItems})
    })
  }

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems
      selectedFoodItems.push(prevState.foodList[rowId])
      return { selectedFoodItems }
    })
    // set all rows in list to inactive (unselected)
    // let updatedResults = this.state.foodList.map(foodItem => {
    //   let updatedFoodItem = { ...foodItem }
    //   updatedFoodItem.active = false
    //   return updatedFoodItem
    // })
    // set the selected row as active
    // updatedResults[rowId].active = true
    // // retrieveFoodItem(updatedResults[rowId].fdcId).then(foodItem => {
    //   this.setState({
    //     foodList: updatedResults,
    //     activeFood: updatedResults[rowId],
    //     activeFoodDetails: updatedResults[rowId],
    //     showModal: true
    //   })
    // })
  }

  selectFoodItem = event => {
    // this.toggleModal()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems
      selectedFoodItems.push(prevState.activeFoodDetails)
      return { selectedFoodItems }
    })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal }
    })
  }

  // move this to an external module
  transformFoodItem = foodItem => {
    // console.log(foodItem)
    // 1008 = Energy in kcal
    // 1003 = Protein
    // 1004 = Total lipid (fat)
    // 2039 = Carbohydrates
    // 1005 = Carbohydrates by difference
    // 1079 = Fiber, total dietary
    // 2000 = sugars, total
    const nutrientIds = [1008, 1003, 1004, 1005, 1079]

    let transformedFoodItem = {
      description: foodItem.description,
      nutrients: []
    }
    foodItem.foodNutrients.forEach(nutrient => {
      // console.log(nutrient)
      nutrientIds.forEach(id => {
        if (nutrient.nutrientId === id) {
          transformedFoodItem.nutrients.push(nutrient)
        }
      })
    })
  }

  retrieve = () => {
    retrieveFoodList(this.state.searchValue)
      .then(apiSearchResults => {
        let foodList = []
        let error = true
        let message = 'No items found for search term.'
        // let initialFoodList = apiSearchResults.foods
        let initialFoodList = apiSearchResults
        console.log(initialFoodList)

        if (initialFoodList && initialFoodList.length > 0) {
          error = false
          message = ''
          foodList = initialFoodList.map( (foodItem,index) => {
            return {
              active: false,
              ...foodItem
            }
          })
        }

        this.setState({
          foodList: foodList,
          loading: false,
          showConfirm: error,
          message: message
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  addToMeal = () => {
    // add selectedFoodItems to meal.
    console.log(this.state.selectedFoodItems)
    this.setState( prevState => {
      let items = prevState.selectedFoodItems
      items.push(this.state.activeFood)
      return { ...prevState, selectedFoodItems: items}
    })
  }

  addFoodtoApp = () => {
    const url = 'appdb'
    const foodToAdd = this.state.activeFoodDetails
    return axiosFood
      .post(url, foodToAdd)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearchClick()
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {(meal, updateMeal) => (
          <div className={styles.container}>
            <div>meal: {meal.name}</div>
            <SelectedFoods
              foodList={this.state.selectedFoodItems}
              selectedFoodItems={this.state.selectedFoodItems}
              rowDelete={this.handleRowDelete}
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
            <Button color='orange' onClick={this.handleSearchClick} disabled={false}>
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
    )
  }
}

export default FoodSearch
