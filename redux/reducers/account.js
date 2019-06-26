import {
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  GET_ACCOUNT_BY_ID_REQUEST,
  GET_ACCOUNT_BY_ID_SUCCESS,
  GET_ACCOUNT_BY_ID_FAILURE,
  CHOOSE_ACCOUNT,
  POST_ACCOUNT_REQUEST,
  POST_ACCOUNT_SUCCESS,
  POST_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  accounts: null,
  isLoading: false,
  currentAccount: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
    case GET_ACCOUNT_BY_ID_REQUEST:
    case POST_ACCOUNT_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
        error: null,
      };
    case GET_ACCOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentAccount: action.payload,
        error: null,
      };

    case POST_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: {
          total: state.accounts.total + 1,
          accounts: [...state.accounts.accounts, action.payload],
        },
        error: null,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: {
          total: state.accounts.total - 1,
          accounts: state.accounts.accounts.filter(
            account => account._id !== action.payload._id
          ),
        },
        isLoading: false,
        error: null,
      };

    case GET_ACCOUNTS_FAILURE:
    case GET_ACCOUNT_BY_ID_FAILURE:
    case POST_ACCOUNT_FAILURE:
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CHOOSE_ACCOUNT:
      return {
        ...state,
        currentAccount: action.payload,
      };
    default:
      return state;
  }
};
