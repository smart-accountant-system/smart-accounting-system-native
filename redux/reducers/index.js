import { combineReducers } from 'redux';
import user from './user';
import receipt from './receipt';
import account from './account';
import transaction from './transaction';
import invoice from './invoice';
import category from './category';
import employee from './employee';
import customer from './customer';
import dashboard from './dashboard';
import payment from './payment';

export default combineReducers({
  user,
  receipt,
  transaction,
  invoice,
  account,
  category,
  employee,
  customer,
  dashboard,
  payment,
});
