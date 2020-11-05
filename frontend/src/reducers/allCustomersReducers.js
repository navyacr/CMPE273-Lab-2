import { CUSTOMERS_VIEW, GET_MESSAGE} from '../actions/types';

const initialState = {
  user: {},
  messages: {}
};

export default function (state = initialState, action) {
  console.log("Customerview reducer is", action)
  if (action.type === CUSTOMERS_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_MESSAGE) {
    return {
      ...state,
      messages: action.payload,
    };
  }
  return state;
}
