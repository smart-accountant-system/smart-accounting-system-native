/* eslint-disable prettier/prettier */
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
} from '../actions';

const INITIAL_STATE = {
  categories: null,
  isLoading: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
    case POST_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
        error: null
      };
    case POST_CATEGORY_SUCCESS:
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case GET_CATEGORIES_FAILURE:
    case POST_CATEGORY_FAILURE:
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
