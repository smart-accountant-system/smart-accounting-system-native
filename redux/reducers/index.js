import { combineReducers } from 'redux';
import user from './user';
import receipt from './receipt';
import account from './account';
import transaction from './transaction';
import invoice from './invoice';
import category from './category';

export default combineReducers({
  user,
  receipt,
  transaction,
  invoice,
  account,
  category,
});
