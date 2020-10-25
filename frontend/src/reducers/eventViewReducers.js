import { EVENT_VIEW } from '../actions/types';


const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  console.log("Eventview reducer is", action)
  if (action.type === EVENT_VIEW) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
