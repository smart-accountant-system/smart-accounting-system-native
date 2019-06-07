/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_INVOICES_REQUEST = 'get-invoices-request';
export const GET_INVOICES_SUCCESS = 'get-invoices-success';
export const GET_INVOICES_FAILURE = 'get-invoices-failure';

export function getInvoices(callback) {
  return async dispatch => {
    try {
      dispatch({ type: GET_INVOICES_REQUEST });
      const endpoint = '/invoices';

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200) {
        callback.success();
        dispatch({
          type: GET_INVOICES_SUCCESS,
          payload: result.data,
        });
      } else {
        callback.failure();
        dispatch({
          type: GET_INVOICES_FAILURE,
        });
      }
    } catch (error) {
      callback.failure();
      dispatch({
        type: GET_INVOICES_FAILURE,
        payload: error,
      });
    }
  };
}
