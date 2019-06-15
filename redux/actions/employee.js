/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_EMPLOYEES_REQUEST = 'get-employees-request';
export const GET_EMPLOYEES_SUCCESS = 'get-employees-success';
export const GET_EMPLOYEES_FAILURE = 'get-employees-failure';

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

      if (result.status === 200) {
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
