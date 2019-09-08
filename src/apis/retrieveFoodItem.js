import { axiosFood } from '../config/apiConfig';

const retrieveFoodItem = id => {
  const url = `foodItems/${id}`;
  // console.log(`url: ${url}`)
  return axiosFood
    .get(url)
    .then(function(response) {
      // handle success
      // return parseResponse(response);
      return response.data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieveFoodItem] api error: ${error}`);
      return [];
    });
};

const parseResponse = (response) => {
  // console.log({response})
  // {"foodClass":"Survey","description":"Beef and broccoli","foodNutrients":[{"type":"FoodNutrient","id":2439487,"nutrient":{"id":1003,"number":"203","name":"Protein"
  // response.data.foodNutrients.forEach( nutrient => {
    // console.log(JSON.stringify(nutrient))
  // })
  return response
}

export default retrieveFoodItem;