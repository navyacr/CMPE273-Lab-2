import axios from 'axios';
import { ONE_ATTENDEE_VIEW } from './types';
import backendServer from '../config';


export const oneEventAttendeeView = (cusid) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/customers/${cusid}/profile`)
    .then((response) => dispatch({
      type: ONE_ATTENDEE_VIEW,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ONE_ATTENDEE_VIEW,
          payload: error.response.data,
        });
      }
    });
};
