import { combineReducers } from 'redux';
import alert from './alert';
import register from './auth';

export default combineReducers({
  alert,
  register,
});

// How to keep sending requests for getting authentication token
