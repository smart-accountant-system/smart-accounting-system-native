import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  CHOOSE_TRANSACTION,
} from '../actions';

const INITIAL_STATE = {
  transactions: null,
  currentTransaction: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
      };
    case GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHOOSE_TRANSACTION:
      return {
        ...state,
        currentTransaction: action.payload,
      };
    default:
      return state;
  }
};
