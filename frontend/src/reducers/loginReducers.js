import { CUSTOMER_LOGIN, RESTAURANT_LOGIN } from '../actions/types';


const initialState = {
  user: {},
};

// eslint-disable-next-line func-names
export default function (state = initialState, action) {
  if (action.type === RESTAURANT_LOGIN || action.type === CUSTOMER_LOGIN) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
