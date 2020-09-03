// import axios from "axios";
import { axiosFood } from '../config/apiConfig';

const retrieveFoodList = searchTerm => {
  const url = 'foodItems'

  return axiosFood
    .get(url)
    .then(function(response) {
      // console.log(response.data)
      // const data = parseResponse(response)
      return response.data
    })
    .catch(function(error) {
      console.log(`[ui - retrieveFoodList] api error: ${error}`);
      return [];
    });

}
// const retrieveFoodList = searchTerm => {
//   const searchData = { "requireAllWords":true, "generalSearchInput":searchTerm }
//   const url = 'foodItems'

//   return axiosFood
//     .post(url, searchData)
//     .then(function(response) {
//       const data = parseResponse(response)
//       return data
//     })
//     .catch(function(error) {
//       console.log(`[ui - retrieveFoodList] api error: ${error}`);
//       return [];
//     });
// };

const parseResponse = (response) => {
    const responseData = response.data.response
    let data = { 
      totalHits: responseData.totalHits,
      currentPage: responseData.currentPage,
      totalPages: responseData.totalPages,
      foods: responseData.foods
    }
    return data;
}

export default retrieveFoodList;