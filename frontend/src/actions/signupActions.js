import axios from 'axios';
import { RESTAURANT_SIGNUP } from './types';
import backendServer from '../config'

export const restaurantsSignup = (restaurantsData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/restaurants/info`, restaurantsData)
    .then((response) => dispatch({
      type: RESTAURANT_SIGNUP,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: RESTAURANT_SIGNUP,
          payload: error.response.data,
        });
      }
    });

    
};
