import axios from 'axios';
import { MENU_VIEW } from './types';
import backendServer from '../config'

export const restaurantMenu = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  const id = localStorage.getItem('restaurant_id')
  axios.get(`${backendServer}/customers/${id}/dishes`)
    .then((response) => dispatch({
      type: MENU_VIEW,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: MENU_VIEW,
          payload: error.response.data,
        });
      }
    });
};
