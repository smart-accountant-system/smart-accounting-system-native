import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILURE,
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
    default:
      return state;
  }
};
