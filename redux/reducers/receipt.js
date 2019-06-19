import {
  GET_RECEIPTS_REQUEST,
  GET_RECEIPTS_SUCCESS,
  GET_RECEIPTS_FAILURE,
  GET_RECEIPT_BY_ID_REQUEST,
  GET_RECEIPT_BY_ID_SUCCESS,
  GET_RECEIPT_BY_ID_FAILURE,
  DELETE_RECEIPT_BY_ID_REQUEST,
  DELETE_RECEIPT_BY_ID_SUCCESS,
  DELETE_RECEIPT_BY_ID_FAILURE,
  CHOOSE_RECEIPT,
} from '../actions';

const INITIAL_STATE = {
  receipts: null,
  currentReceipt: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RECEIPTS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: action.payload,
        error: null,
      };
    case GET_RECEIPTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHOOSE_RECEIPT:
      return {
        ...state,
        currentReceipt: action.payload,
      };
    case GET_RECEIPT_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_RECEIPT_BY_ID_SUCCESS:
      return {
        ...state,
        currentReceipt: action.payload,
        error: null,
      };
    case GET_RECEIPT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_RECEIPT_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_RECEIPT_BY_ID_SUCCESS:
      return {
        ...state,
        receipts: state.receipts.filter(
          receipt => receipt._id !== action.payload
        ),
        error: null,
      };
    case DELETE_RECEIPT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
