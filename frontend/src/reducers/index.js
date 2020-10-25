import { combineReducers } from 'redux';
import signupReducers from './signupReducers';
import loginReducers from './loginReducers';
import restaurantProfileReducers from './restaurantProfileReducers';
import postEvent from './eventReducers';
import menuUpdate from './menuReducers';
import eventView from './eventViewReducers';

export default combineReducers({
  login: loginReducers,
  signup: signupReducers,
  restaurantProfileUpdate: restaurantProfileReducers,
  menuUpdate: menuUpdate,
  postEvent: postEvent,
  eventView: eventView
  
});
