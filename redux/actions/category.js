/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_CATEGORIES_REQUEST = 'get-categories-request';
export const GET_CATEGORIES_SUCCESS = 'get-categories-success';
export const GET_CATEGORIES_FAILURE = 'get-categories-failure';

export function getCategories(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CATEGORIES_REQUEST });
      const endpoint = '/categories';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_CATEGORIES_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: GET_CATEGORIES_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
