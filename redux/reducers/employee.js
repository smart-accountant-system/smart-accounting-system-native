import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE,
  PATCH_EMPLOYEE_REQUEST,
  PATCH_EMPLOYEE_SUCCESS,
  PATCH_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  employees: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATCH_EMPLOYEE_REQUEST:
    case GET_EMPLOYEES_REQUEST:
    case POST_EMPLOYEE_REQUEST:
    case DELETE_EMPLOYEE_REQUEST:
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
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: {
          employees: [action.payload, ...state.employees.employees],
          total: state.employees.total + 1,
        },
        error: null,
      };

    case PATCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: {
          employees: state.employees.employees.map(employee =>
            employee._id === action.payload._id ? action.payload : employee
          ),
          total: state.employees.total,
        },
        error: null,
      };

    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: {
          total: state.employees.total - 1,
          employees: state.employees.employees.filter(
            employee => employee._id !== action.payload._id
          ),
        },
        error: null,
      };

    case PATCH_EMPLOYEE_FAILURE:
    case GET_EMPLOYEES_FAILURE:
    case POST_EMPLOYEE_FAILURE:
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
