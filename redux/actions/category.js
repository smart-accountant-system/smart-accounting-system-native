/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_CATEGORIES_REQUEST = 'get-categories-request';
export const GET_CATEGORIES_SUCCESS = 'get-categories-success';
export const GET_CATEGORIES_FAILURE = 'get-categories-failure';

export const POST_CATEGORY_REQUEST = 'post-category-request';
export const POST_CATEGORY_SUCCESS = 'post-category-success';
export const POST_CATEGORY_FAILURE = 'post-category-failure';

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

      if (result.status === 200 || result.status === 304) {
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

export function addCategory(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_CATEGORY_REQUEST });
      const endpoint = '/categories';

      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_CATEGORY_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_CATEGORY_FAILURE,
        });
        failure();
      }
    } catch (error) {
      if (error.response.status === 401) {
        handle401();
      }
      dispatch({
        type: POST_CATEGORY_FAILURE,
        payload: error,
      });
      failure();
    }
  };
}
