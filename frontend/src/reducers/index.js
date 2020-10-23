import { combineReducers } from 'redux';
import signupReducers from './signupReducers';
import loginReducers from './loginReducers';
import restaurantProfileReducers from './restaurantProfileReducers';

export default combineReducers({
  restaurantsLogin: loginReducers,
  signup: signupReducers,
  restaurantProfileUpdate: restaurantProfileReducers
});
