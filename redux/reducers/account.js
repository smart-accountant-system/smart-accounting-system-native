import {
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  accounts: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        accounts: null,
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
    default:
      return state;
  }
};
