import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  customers: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        error: null,
      };
    case GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
