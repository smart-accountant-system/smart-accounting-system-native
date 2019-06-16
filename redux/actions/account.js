/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_ACCOUNTS_REQUEST = 'get-accounts-request';
export const GET_ACCOUNTS_SUCCESS = 'get-accounts-success';
export const GET_ACCOUNTS_FAILURE = 'get-accounts-failure';

export const GET_ACCOUNT_BY_ID_REQUEST = 'get-account-by-id-request';
export const GET_ACCOUNT_BY_ID_SUCCESS = 'get-account-by-id-success';
export const GET_ACCOUNT_BY_ID_FAILURE = 'get-account-by-id-failure';

export const CHOOSE_ACCOUNT = 'choose-account';

export function getAccounts(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_ACCOUNTS_REQUEST });
      const endpoint = '/accounts';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_ACCOUNTS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_ACCOUNTS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function chooseAccount(account) {
  return {
    type: CHOOSE_ACCOUNT,
    payload: account,
  };
}

export function getAccountById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_ACCOUNT_BY_ID_REQUEST });
      const endpoint = `/accounts/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_ACCOUNT_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_ACCOUNT_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_ACCOUNT_BY_ID_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
