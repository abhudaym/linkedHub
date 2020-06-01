import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  alert,
  auth,
});

// How to keep sending requests for getting authentication token
