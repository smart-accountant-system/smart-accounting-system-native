/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_EMPLOYEES_REQUEST = 'get-employees-request';
export const GET_EMPLOYEES_SUCCESS = 'get-employees-success';
export const GET_EMPLOYEES_FAILURE = 'get-employees-failure';

export function getInvoices({ params, success, failure }) {
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
        success();
        dispatch({
          type: GET_EMPLOYEES_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_EMPLOYEES_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_EMPLOYEES_FAILURE,
        payload: error,
      });
    }
  };
}
