import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  payments: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
        loading: false,
        error: null,
      };
    case GET_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
