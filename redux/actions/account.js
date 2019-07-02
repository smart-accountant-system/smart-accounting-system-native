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

export const POST_ACCOUNT_REQUEST = 'post-account-request';
export const POST_ACCOUNT_SUCCESS = 'post-account-success';
export const POST_ACCOUNT_FAILURE = 'post-account-failure';

export const UPDATE_ACCOUNT_REQUEST = 'update-account-request';
export const UPDATE_ACCOUNT_SUCCESS = 'update-account-success';
export const UPDATE_ACCOUNT_FAILURE = 'update-account-failure';

export const DELETE_ACCOUNT_REQUEST = 'delete-account-request';
export const DELETE_ACCOUNT_SUCCESS = 'delete-account-success';
export const DELETE_ACCOUNT_FAILURE = 'delete-account-failure';

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
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
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
      dispatch({
        type: GET_ACCOUNT_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function addAccount(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_ACCOUNT_REQUEST });
      const endpoint = '/accounts';

      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_ACCOUNT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_ACCOUNT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: POST_ACCOUNT_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function removeAccount(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_ACCOUNT_REQUEST });
      const endpoint = `/accounts/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_ACCOUNT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_ACCOUNT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: DELETE_ACCOUNT_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}
export function updateAccount(
  _id,
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_ACCOUNT_REQUEST });
      const endpoint = `/accounts/${_id}`;

      const result = await query({
        data,
        endpoint,
        method: METHODS.patch,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: UPDATE_ACCOUNT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: UPDATE_ACCOUNT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ACCOUNT_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}
