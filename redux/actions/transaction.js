/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_TRANSACTIONS_REQUEST = 'get-transactions-request';
export const GET_TRANSACTIONS_SUCCESS = 'get-transactions-success';
export const GET_TRANSACTIONS_FAILURE = 'get-transactions-failure';

export const GET_TRANSACTION_BY_ID_REQUEST = 'get-transaction-by-id-request';
export const GET_TRANSACTION_BY_ID_SUCCESS = 'get-transaction-by-id-success';
export const GET_TRANSACTION_BY_ID_FAILURE = 'get-transaction-by-id-failure';

export const POST_TRANSACTION_REQUEST = 'post-transaction-request';
export const POST_TRANSACTION_SUCCESS = 'post-transaction-success';
export const POST_TRANSACTION_FAILURE = 'post-transaction-failure';

export const DELETE_TRANSACTION_BY_ID_REQUEST =
  'delete-transaction-by-id-request';
export const DELETE_TRANSACTION_BY_ID_SUCCESS =
  'delete-transaction-by-id-success';
export const DELETE_TRANSACTION_BY_ID_FAILURE =
  'delete-transaction-by-id-failure';

export const CHOOSE_TRANSACTION = 'choose-transaction';

export const ADD_RECEIPT_TO_TRANSACTION = 'add-receipt-to-transaction';
export const ADD_CREDIT_ACCOUNT_TO_TRANSACTION =
  'add-credit-account-to-transaction';
export const ADD_DEBIT_ACCOUNT_TO_TRANSACTION =
  'add-debit-account-to-transaction';

export const GET_RECEIPTS_FOR_TRANSACTION_REQUEST =
  'get-receipts-for-transaction-request';
export const GET_RECEIPTS_FOR_TRANSACTION_SUCCESS =
  'get-receipts-for-transaction-success';
export const GET_RECEIPTS_FOR_TRANSACTION_FAILURE =
  'get-receipts-for-transaction-failure';

export function getTransactions(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_TRANSACTIONS_REQUEST });
      const endpoint = ENDPOINTS.getTransactions;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_TRANSACTIONS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_TRANSACTIONS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSACTIONS_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function addTransaction(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_TRANSACTION_REQUEST });
      const endpoint = '/transactions';

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
          type: POST_TRANSACTION_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_TRANSACTION_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: POST_TRANSACTION_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function chooseTransaction(transaction) {
  return {
    type: CHOOSE_TRANSACTION,
    payload: transaction,
  };
}

export function getTransactionById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_TRANSACTION_BY_ID_REQUEST });
      const endpoint = `/transactions/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_TRANSACTION_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_TRANSACTION_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSACTION_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function deleteTransactionById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_TRANSACTION_BY_ID_REQUEST });
      const endpoint = `/transactions/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: DELETE_TRANSACTION_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_TRANSACTION_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: DELETE_TRANSACTION_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function addReceiptToTransaction(receipt) {
  return {
    type: ADD_RECEIPT_TO_TRANSACTION,
    payload: receipt,
  };
}

export function addCreditAccountToTransaction(account) {
  return {
    type: ADD_CREDIT_ACCOUNT_TO_TRANSACTION,
    payload: account,
  };
}

export function addDebitAccountToTransaction(account) {
  return {
    type: ADD_DEBIT_ACCOUNT_TO_TRANSACTION,
    payload: account,
  };
}

export function getReceiptsForTraction(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPTS_FOR_TRANSACTION_REQUEST });
      const endpoint = ENDPOINTS.getReceipts;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_RECEIPTS_FOR_TRANSACTION_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_RECEIPTS_FOR_TRANSACTION_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_RECEIPTS_FOR_TRANSACTION_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}
