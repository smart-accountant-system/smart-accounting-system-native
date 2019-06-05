/* eslint-disable import/no-cycle */
import { query } from '../services/api';
import { ENDPOINTS, METHODS } from '../constants/api';

export const GET_RECEIPTS_REQUEST = 'get-receipts-request';
export const GET_RECEIPTS_SUCCESS = 'get-receipts-success';
export const GET_RECEIPTS_FAILURE = 'get-receipts-failure';

export function getReceipts(callback) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPTS_REQUEST });
      const endpoint = ENDPOINTS.getReceipts;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200) {
        callback.success();
        dispatch({
          type: GET_RECEIPTS_SUCCESS,
          payload: result.data,
        });
      } else {
        callback.failure();
        dispatch({
          type: GET_RECEIPTS_FAILURE,
        });
      }
    } catch (error) {
      callback.failure();
      dispatch({
        type: GET_RECEIPTS_FAILURE,
        payload: error,
      });
    }
  };
}
