import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  POST_CUSTOMER_REQUEST,
  POST_CUSTOMER_SUCCESS,
  POST_CUSTOMER_FAILURE,
  PATCH_CUSTOMER_REQUEST,
  PATCH_CUSTOMER_SUCCESS,
  PATCH_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  customers: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATCH_CUSTOMER_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
    case POST_CUSTOMER_REQUEST:
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
    case POST_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: {
          total: state.customers.total + 1,
          customers: [action.payload, ...state.customers.customers],
        },
        error: null,
      };

    case PATCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: {
          total: state.customers.total,
          customers: state.customers.customers.map(customer =>
            customer._id === action.payload._id ? action.payload : customer
          ),
        },
        error: null,
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: {
          total: state.customers.total - 1,
          customers: state.customers.customers.filter(
            customer => customer._id !== action.payload._id
          ),
        },
        error: null,
      };
    case PATCH_CUSTOMER_FAILURE:
    case GET_CUSTOMERS_FAILURE:
    case POST_CUSTOMER_FAILURE:
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
