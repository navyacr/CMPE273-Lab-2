import axios from 'axios';
import { CUSTOMERS_VIEW, GET_MESSAGE } from './types';
import backendServer from '../config'

export const customersView = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/customers/allCustomers`)
    .then((response) => dispatch({
      type: CUSTOMERS_VIEW,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMERS_VIEW,
          payload: error.response.data,
        });
      }
    });
};

export const getMessages = (payload) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendServer}/restaurants/getMessage`, payload)
    .then((response) => dispatch({
      type: GET_MESSAGE,
      payload: response.data.updatedList,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_MESSAGE,
          payload: error.response.data.updatedList,
        });
      }
    });
};
