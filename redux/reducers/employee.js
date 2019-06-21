import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  employees: null,
  isLoading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
    case POST_EMPLOYEE_REQUEST:
    case DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        isLoading: false,
        error: null,
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: {
          total: state.employees.total - 1,
          employees: state.employees.employees.filter(
            employee => employee._id !== action.payload._id
          ),
        },
        error: null,
      };

    case GET_EMPLOYEES_FAILURE:
    case POST_EMPLOYEE_FAILURE:
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
