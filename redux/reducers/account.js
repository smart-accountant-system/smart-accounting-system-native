import {
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  GET_ACCOUNT_BY_ID_REQUEST,
  GET_ACCOUNT_BY_ID_SUCCESS,
  GET_ACCOUNT_BY_ID_FAILURE,
  CHOOSE_ACCOUNT,
} from '../actions';

const INITIAL_STATE = {
  accounts: null,
  currentAccount: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        error: null,
      };
    case GET_ACCOUNTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHOOSE_ACCOUNT:
      return {
        ...state,
        currentAccount: action.payload,
      };
    case GET_ACCOUNT_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_ACCOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        currentAccount: action.payload,
        error: null,
      };
    case GET_ACCOUNT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
