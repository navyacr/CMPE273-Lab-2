import { combineReducers } from 'redux';
import signupReducers from './signupReducers';
import loginReducers from './loginReducers';
import restaurantProfileReducers from './restaurantProfileReducers';
import getRestaurant from './restaurantProfileReducers';
import postEvent from './eventReducers';
import menuUpdate from './menuReducers';
import eventView from './eventViewReducers';
import oneEventView from './eventViewReducers';
import oneEventAttendeeView from './eventViewReducers';
import restaurantViewOrders from './restaurantViewOrdersReducers';
import restaurantViewReview from './restaurantViewOrdersReducers';
import restaurantMenu from './restaurantViewOrdersReducers';

export default combineReducers({
  login: loginReducers,
  signup: signupReducers,
  restaurantProfileUpdate: restaurantProfileReducers,
  menuUpdate: menuUpdate,
  postEvent: postEvent,
  eventView: eventView,
  oneEventView: oneEventView,
  oneEventAttendeeView: oneEventAttendeeView,
  restaurantViewOrders: restaurantViewOrders,
  restaurantViewReview: restaurantViewReview,
  restaurantMenu: restaurantMenu,
  getRestaurant: getRestaurant
  
});
