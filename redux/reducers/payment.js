import {
  ADD_PAYMENTS_REQUEST,
  ADD_PAYMENTS_SUCCESS,
  ADD_PAYMENTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  payments: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
