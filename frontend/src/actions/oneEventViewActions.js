import axios from 'axios';
import { ONE_EVENT_VIEW } from './types';
import backendServer from '../config'

export const oneEventView = (eventid) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${backendServer}/events/${eventid}/attendees`)
    .then((response) => dispatch({
      type: ONE_EVENT_VIEW,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ONE_EVENT_VIEW,
          payload: error.response.data,
        });
      }
    });
};
