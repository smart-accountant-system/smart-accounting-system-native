/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_CUSTOMERS_REQUEST = 'get-customer-request';
export const GET_CUSTOMERS_SUCCESS = 'get-customer-success';
export const GET_CUSTOMERS_FAILURE = 'get-customer-failure';

export function getCustomers({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST });
      const endpoint = '/customers';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_CUSTOMERS_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_CUSTOMERS_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error,
      });
    }
  };
}
