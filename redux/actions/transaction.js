/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_TRANSACTIONS_REQUEST = 'get-transactions-request';
export const GET_TRANSACTIONS_SUCCESS = 'get-transactions-success';
export const GET_TRANSACTIONS_FAILURE = 'get-transactions-failure';

export function getTransactions(callback) {
  return async dispatch => {
    try {
      dispatch({ type: GET_TRANSACTIONS_REQUEST });
      const endpoint = ENDPOINTS.getTransactions;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200) {
        callback.success();
        dispatch({
          type: GET_TRANSACTIONS_SUCCESS,
          payload: result.data,
        });
      } else {
        callback.failure();
        dispatch({
          type: GET_TRANSACTIONS_FAILURE,
        });
      }
    } catch (error) {
      callback.failure();
      dispatch({
        type: GET_TRANSACTIONS_FAILURE,
        payload: error,
      });
    }
  };
}
