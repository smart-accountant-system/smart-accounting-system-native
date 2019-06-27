/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_PAYMENTS_FOR_INVOICE_REQUEST =
  'get-payments-for-invoice-request';
export const GET_PAYMENTS_FOR_INVOICE_SUCCESS =
  'get-payments-for-invoice-success';
export const GET_PAYMENTS_FOR_INVOICE_FAILURE =
  'get-payments-for-invoice-failure';

export const GET_PAYMENTS_REQUEST = 'get-payments-request';
export const GET_PAYMENTS_SUCCESS = 'get-payments-success';
export const GET_PAYMENTS_FAILURE = 'get-payments-failure';

export const POST_PAYMENT_REQUEST = 'post-payment-request';
export const POST_PAYMENT_SUCCESS = 'post-payment-success';
export const POST_PAYMENT_FAILURE = 'post-payment-failure';

export const DELETE_PAYMENT_REQUEST = 'delete-payment-request';
export const DELETE_PAYMENT_SUCCESS = 'delete-payment-success';
export const DELETE_PAYMENT_FAILURE = 'delete-payment-failure';

export function getPaymentsForInvoice(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_PAYMENTS_FOR_INVOICE_REQUEST });
      const endpoint = `/payments`;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_PAYMENTS_FOR_INVOICE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_PAYMENTS_FOR_INVOICE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_PAYMENTS_FOR_INVOICE_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function getPayments(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_PAYMENTS_REQUEST });
      const endpoint = `/payments`;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_PAYMENTS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_PAYMENTS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_PAYMENTS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function addPayment(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_PAYMENT_REQUEST });
      const endpoint = '/payments';

      const result = await query({
        endpoint,
        data,
        method: METHODS.post,
      });

      if (
        result.status === 200 ||
        result.status === 304 ||
        result.status === 201
      ) {
        dispatch({
          type: POST_PAYMENT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_PAYMENT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: POST_PAYMENT_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function removePayment(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_PAYMENT_REQUEST });
      const endpoint = `/payments/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_PAYMENT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_PAYMENT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: DELETE_PAYMENT_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
