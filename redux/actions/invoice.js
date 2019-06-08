/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_INVOICES_REQUEST = 'get-invoices-request';
export const GET_INVOICES_SUCCESS = 'get-invoices-success';
export const GET_INVOICES_FAILURE = 'get-invoices-failure';

export function getInvoices({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_INVOICES_REQUEST });
      const endpoint = '/invoices';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_INVOICES_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_INVOICES_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_INVOICES_FAILURE,
        payload: error,
      });
    }
  };
}
