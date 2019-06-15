/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_RECEIPTS_REQUEST = 'get-receipts-request';
export const GET_RECEIPTS_SUCCESS = 'get-receipts-success';
export const GET_RECEIPTS_FAILURE = 'get-receipts-failure';

export function getReceipts(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPTS_REQUEST });
      const endpoint = ENDPOINTS.getReceipts;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        dispatch({
          type: GET_RECEIPTS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_RECEIPTS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_RECEIPTS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
