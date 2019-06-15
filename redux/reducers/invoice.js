import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICE_BY_ID_REQUEST,
  GET_INVOICE_BY_ID_SUCCESS,
  GET_INVOICE_BY_ID_FAILURE,
  CHOOSE_INVOICE,
} from '../actions';

const INITIAL_STATE = {
  invoices: null,
  currentInvoice: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES_REQUEST:
      return {
        ...state,
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
    case CHOOSE_INVOICE:
      return {
        ...state,
        currentInvoice: action.payload,
      };
    case GET_INVOICE_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        currentInvoice: action.payload,
        error: null,
      };
    case GET_INVOICE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
