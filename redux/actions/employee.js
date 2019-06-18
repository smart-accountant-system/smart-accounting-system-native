/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_EMPLOYEES_REQUEST = 'get-employees-request';
export const GET_EMPLOYEES_SUCCESS = 'get-employees-success';
export const GET_EMPLOYEES_FAILURE = 'get-employees-failure';

export const POST_EMPLOYEE_REQUEST = 'post-employee-request';
export const POST_EMPLOYEE_SUCCESS = 'post-employee-success';
export const POST_EMPLOYEE_FAILURE = 'post-employee-failure';

export const DELETE_EMPLOYEE_REQUEST = 'delete-employee-request';
export const DELETE_EMPLOYEE_SUCCESS = 'delete-employee-success';
export const DELETE_EMPLOYEE_FAILURE = 'delete-employee-failure';

export function getEmployees(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_EMPLOYEES_REQUEST });
      const endpoint = '/employees';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_EMPLOYEES_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_EMPLOYEES_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_EMPLOYEES_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function addEmployee(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_EMPLOYEE_REQUEST });
      const endpoint = '/employees';

      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_EMPLOYEE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_EMPLOYEE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: POST_EMPLOYEE_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function removeEmployee(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_EMPLOYEE_REQUEST });
      const endpoint = `/employees/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_EMPLOYEE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_EMPLOYEE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: DELETE_EMPLOYEE_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
