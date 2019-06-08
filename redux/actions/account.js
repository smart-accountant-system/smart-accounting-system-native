/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_ACCOUNTS_REQUEST = 'get-accounts-request';
export const GET_ACCOUNTS_SUCCESS = 'get-accounts-success';
export const GET_ACCOUNTS_FAILURE = 'get-accounts-failure';

export function getAccounts({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_ACCOUNTS_REQUEST });
      const endpoint = '/accounts';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_ACCOUNTS_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_ACCOUNTS_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: error,
      });
    }
  };
}
