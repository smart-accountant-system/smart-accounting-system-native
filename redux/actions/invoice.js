/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_INVOICES_REQUEST = 'get-invoices-request';
export const GET_INVOICES_SUCCESS = 'get-invoices-success';
export const GET_INVOICES_FAILURE = 'get-invoices-failure';

export function getInvoices(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
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
        dispatch({
          type: GET_INVOICES_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_INVOICES_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_INVOICES_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
