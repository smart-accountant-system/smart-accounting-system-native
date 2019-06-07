import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  invoices: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES_REQUEST:
      return {
        ...state,
        invoices: null,
        error: null,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        error: null,
      };
    case GET_INVOICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
