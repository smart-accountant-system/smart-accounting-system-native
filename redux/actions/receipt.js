/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_RECEIPTS_REQUEST = 'get-receipts-request';
export const GET_RECEIPTS_SUCCESS = 'get-receipts-success';
export const GET_RECEIPTS_FAILURE = 'get-receipts-failure';

export const GET_RECEIPT_BY_ID_REQUEST = 'get-receipt-by-id-request';
export const GET_RECEIPT_BY_ID_SUCCESS = 'get-receipt-by-id-success';
export const GET_RECEIPT_BY_ID_FAILURE = 'get-receipt-by-id-failure';

export const DELETE_RECEIPT_BY_ID_REQUEST = 'delete-receipt-by-id-request';
export const DELETE_RECEIPT_BY_ID_SUCCESS = 'delete-receipt-by-id-success';
export const DELETE_RECEIPT_BY_ID_FAILURE = 'delete-receipt-by-id-failure';

export const CHOOSE_RECEIPT = 'choose-receipt';

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

      if (result.status === 200 || result.status === 304) {
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

export function chooseReceipt(receipt) {
  return {
    type: CHOOSE_RECEIPT,
    payload: receipt,
  };
}

export function getReceiptById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPT_BY_ID_REQUEST });
      const endpoint = `/receipts/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_RECEIPT_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_RECEIPT_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_RECEIPT_BY_ID_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function deleteReceiptById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_RECEIPT_BY_ID_REQUEST });
      const endpoint = `/receipts/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_RECEIPT_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_RECEIPT_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: DELETE_RECEIPT_BY_ID_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
