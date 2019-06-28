/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_INVOICES_REQUEST = 'get-invoices-request';
export const GET_INVOICES_SUCCESS = 'get-invoices-success';
export const GET_INVOICES_FAILURE = 'get-invoices-failure';

export const GET_INVOICE_BY_ID_REQUEST = 'get-invoice-by-id-request';
export const GET_INVOICE_BY_ID_SUCCESS = 'get-invoice-by-id-success';
export const GET_INVOICE_BY_ID_FAILURE = 'get-invoice-by-id-failure';

export const POST_INVOICE_REQUEST = 'post-invoice-request';
export const POST_INVOICE_SUCCESS = 'post-invoice-success';
export const POST_INVOICE_FAILURE = 'post-invoice-failure';

export const DELETE_INVOICE_REQUEST = 'delete-invoice-request';
export const DELETE_INVOICE_SUCCESS = 'delete-invoice-success';
export const DELETE_INVOICE_FAILURE = 'delete-invoice-failure';

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

      if (result.status === 200 || result.status === 304) {
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

export function getInvoiceById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_INVOICE_BY_ID_REQUEST });
      const endpoint = `/invoices/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_INVOICE_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_INVOICE_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_INVOICE_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function addInvoice(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_INVOICE_REQUEST });
      const endpoint = '/invoices';

      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_INVOICE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_INVOICE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: POST_INVOICE_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function removeInvoice(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_INVOICE_REQUEST });
      const endpoint = `/invoices/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_INVOICE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_INVOICE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: DELETE_INVOICE_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
