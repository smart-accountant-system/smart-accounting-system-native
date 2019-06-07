import { combineReducers } from 'redux';
import user from './user';
import receipt from './receipt';
import transaction from './transaction';

export default combineReducers({
  user,
  receipt,
  transaction,
});
