import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILURE,
  POST_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  POST_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_SUCCESS,
  POST_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  dashboard: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
        error: null,
      };
    case GET_DASHBOARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalCategory: state.dashboard.totalCategory + 1,
        },
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalCategory: state.dashboard.totalCategory - 1,
        },
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalEmployee: state.dashboard.totalEmployee + 1,
        },
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalEmployee: state.dashboard.totalEmployee - 1,
        },
      };
    case POST_CUSTOMER_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalCustomer: state.dashboard.totalCustomer + 1,
        },
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          totalCustomer: state.dashboard.totalCustomer - 1,
        },
      };
    default:
      return state;
  }
};
