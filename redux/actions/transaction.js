/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_TRANSACTIONS_REQUEST = 'get-transactions-request';
export const GET_TRANSACTIONS_SUCCESS = 'get-transactions-success';
export const GET_TRANSACTIONS_FAILURE = 'get-transactions-failure';

export const GET_TRANSACTION_BY_ID_REQUEST = 'get-transaction-by-id-request';
export const GET_TRANSACTION_BY_ID_SUCCESS = 'get-transaction-by-id-success';
export const GET_TRANSACTION_BY_ID_FAILURE = 'get-transaction-by-id-failure';

export const CHOOSE_TRANSACTION = 'choose-transaction';

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
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_TRANSACTIONS_FAILURE,
        payload: error,
      });
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
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_TRANSACTION_BY_ID_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
