import {
  GET_RECEIPTS_REQUEST,
  GET_RECEIPTS_SUCCESS,
  GET_RECEIPTS_FAILURE,
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
    default:
      return state;
  }
};
