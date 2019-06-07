import { combineReducers } from 'redux';
import user from './user';
import receipt from './receipt';
import invoice from './invoice';

export default combineReducers({
  user,
  receipt,
  invoice,
});
