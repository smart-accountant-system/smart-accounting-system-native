/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_DASHBOARD_REQUEST = 'get-dashboard-request';
export const GET_DASHBOARD_SUCCESS = 'get-dashboard-success';
export const GET_DASHBOARD_FAILURE = 'get-dashboard-failure';

export function getDashboard({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_DASHBOARD_REQUEST });
      const endpoint = '/dashboard';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_DASHBOARD_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_DASHBOARD_FAILURE,
        payload: error,
      });
    }
  };
}
