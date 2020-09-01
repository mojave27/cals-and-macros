import { axiosFood } from '../config/apiConfig'

const retrieveFoodItem = id => {
  const url = `foodItems/${id}`
  // console.log(`url: ${url}`)
  return axiosFood
    .get(url)
    .then(function(response) {
      // handle success
      return parseResponse(response, id);
      // console.log(JSON.stringify(response.data))
      // console.log(response.data)
      // return response.data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieveFoodItem] api error: ${error}`)
      return []
    })
}

// move this to an external module ?
const parseResponse = (response, fdcId) => {
  const targetNutrients = [
    { id: 1008, name: 'calories' },
    { id: 1003, name: 'protein' },
    { id: 1004, name: 'fat' },
    { id: 1005, name: 'carbohydrates' },
    { id: 1079, name: 'fiber' }
  ]
  const foodItem = response.data
  let transformedFoodItem = {
    fdcId,
    description: foodItem.description,
    nutrients: []
  }
  foodItem.foodNutrients.forEach(nutrient => {
    targetNutrients.forEach(target => {
      if (nutrient.nutrient.id === target.id) {
        nutrient.nutrient.name = target.name
        transformedFoodItem.nutrients.push(nutrient.nutrient)
      }
    })
  })
  console.log(JSON.stringify(transformedFoodItem))
  return transformedFoodItem
}

export default retrieveFoodItem
