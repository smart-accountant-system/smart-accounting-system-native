/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_CUSTOMERS_REQUEST = 'get-customer-request';
export const GET_CUSTOMERS_SUCCESS = 'get-customer-success';
export const GET_CUSTOMERS_FAILURE = 'get-customer-failure';

export const POST_CUSTOMER_REQUEST = 'post-customer-request';
export const POST_CUSTOMER_SUCCESS = 'post-customer-success';
export const POST_CUSTOMER_FAILURE = 'post-customer-failure';

export const DELETE_CUSTOMER_REQUEST = 'delete-customer-request';
export const DELETE_CUSTOMER_SUCCESS = 'delete-customer-success';
export const DELETE_CUSTOMER_FAILURE = 'delete-customer-failure';

export function getCustomers(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST });
      const endpoint = '/customers';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_CUSTOMERS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_CUSTOMERS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function addCustomer(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_CUSTOMER_REQUEST });
      const endpoint = '/customers';

      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_CUSTOMER_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_CUSTOMER_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: POST_CUSTOMER_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}

export function removeCustomer(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_CUSTOMER_REQUEST });
      const endpoint = `/customers/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_CUSTOMER_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_CUSTOMER_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: DELETE_CUSTOMER_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
