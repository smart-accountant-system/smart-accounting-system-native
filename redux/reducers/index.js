import { combineReducers } from 'redux';
import user from './user';
import receipt from './receipt';

export default combineReducers({
  user,
  receipt,
});
