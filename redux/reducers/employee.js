import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  employees: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        error: null,
      };
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
