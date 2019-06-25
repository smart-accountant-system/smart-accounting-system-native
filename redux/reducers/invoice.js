/* eslint-disable eqeqeq */
import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICE_BY_ID_REQUEST,
  GET_INVOICE_BY_ID_SUCCESS,
  GET_INVOICE_BY_ID_FAILURE,
  CHOOSE_INVOICE,
  POST_INVOICE_REQUEST,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  invoices: null,
  isLoading: false,
  currentInvoice: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAYMENTS_REQUEST:
    case GET_INVOICES_REQUEST:
    case GET_INVOICE_BY_ID_REQUEST:
    case POST_INVOICE_REQUEST:
    case DELETE_INVOICE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invoices: {
          total: state.invoices.total,
          invoices: state.invoices.invoices.map(invoice =>
            invoice._id == action.payload.invoice
              ? {
                  ...invoice,
                  payments: {
                    payments: action.payload.payments,
                    total: action.payload.total,
                  },
                }
              : invoice
          ),
        },
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invoices: action.payload,
        error: null,
      };
    case GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentInvoice: action.payload, // OLD VER
        invoice: state.invoices.invoices.map(invoice =>
          invoice._id == action.payload._id ? action.payload : invoice
        ),
        error: null,
      };

    case POST_INVOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          total: state.invoices.total - 1,
          invoices: state.invoices.invoices.filter(
            invoice => invoice._id !== action.payload._id
          ),
        },
        isLoading: false,
        error: null,
      };

    case GET_PAYMENTS_FAILURE:
    case GET_INVOICES_FAILURE:
    case GET_INVOICE_BY_ID_FAILURE:
    case POST_INVOICE_FAILURE:
    case DELETE_INVOICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CHOOSE_INVOICE:
      return {
        ...state,
        currentInvoice: action.payload,
      };
    default:
      return state;
  }
};
