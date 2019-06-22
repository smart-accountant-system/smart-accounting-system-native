/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_PAYMENTS_REQUEST = 'get-payments-request';
export const GET_PAYMENTS_SUCCESS = 'get-payments-success';
export const GET_PAYMENTS_FAILURE = 'get-payments-failure';

export const ADD_PAYMENTS_REQUEST = 'add-payments-request';
export const ADD_PAYMENTS_SUCCESS = 'add-payments-success';
export const ADD_PAYMENTS_FAILURE = 'add-payments-failure';

export function getPayments(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_PAYMENTS_REQUEST });
      const endpoint = '/payments';

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
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_PAYMENTS_REQUEST });
      const endpoint = '/payments';

      const result = await query({
        endpoint,
        params,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: ADD_PAYMENTS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: ADD_PAYMENTS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: ADD_PAYMENTS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
