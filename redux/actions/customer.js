/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_CUSTOMERS_REQUEST = 'get-customer-request';
export const GET_CUSTOMERS_SUCCESS = 'get-customer-success';
export const GET_CUSTOMERS_FAILURE = 'get-customer-failure';

export function getCustomers(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST });
      const endpoint = '/customers';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_CUSTOMERS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_CUSTOMERS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
