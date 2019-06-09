import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  categories: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
