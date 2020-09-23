import { combineReducers } from 'redux';
import signupReducers from './signupReducers';
import loginReducers from './loginReducers'

export default combineReducers({
  login: loginReducers,
  signup: signupReducers,
});
