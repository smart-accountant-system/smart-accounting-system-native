import {
  GET_RECEIPTS_REQUEST,
  GET_RECEIPTS_SUCCESS,
  GET_RECEIPTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  receipts: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RECEIPTS_REQUEST:
      return {
        ...state,
        receipts: null,
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
    default:
      return state;
  }
};
