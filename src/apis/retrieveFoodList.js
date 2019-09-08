// import axios from "axios";
import { axiosFood } from '../config/apiConfig';

const retrieveFoodList = searchTerm => {
  // const url = `https://${API_KEY}@api.nal.usda.gov/fdc/v1/search`;
  // const options = { headers: { 'content-type': 'application/json' } };
  const searchData = { "requireAllWords":true, "generalSearchInput":searchTerm }
  // const requestData = { data: {...searchData} } 
  const url = 'foodItems'

  return axiosFood
    .post(url, searchData)
    .then(function(response) {
      // check for status 200?
      // if (response.status === 200)
      // handle success
      const data = parseResponse(response)
      // console.log('[retrieveFoodList] ***** data *****')
      // console.log(data)
      return data
      // return parseResponse(response);
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieveFoodList] api error: ${error}`);
      return [];
    });
};

const parseResponse = (response) => {
    // console.log(`response ${JSON.stringify(response)}`)
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