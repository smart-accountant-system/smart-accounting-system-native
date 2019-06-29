/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_CATEGORIES_REQUEST = 'get-categories-request';
export const GET_CATEGORIES_SUCCESS = 'get-categories-success';
export const GET_CATEGORIES_FAILURE = 'get-categories-failure';

export const POST_CATEGORY_REQUEST = 'post-category-request';
export const POST_CATEGORY_SUCCESS = 'post-category-success';
export const POST_CATEGORY_FAILURE = 'post-category-failure';

export const PATCH_CATEGORY_REQUEST = 'patch-category-request';
export const PATCH_CATEGORY_SUCCESS = 'patch-category-success';
export const PATCH_CATEGORY_FAILURE = 'patch-category-failure';

export const DELETE_CATEGORY_REQUEST = 'delete-category-request';
export const DELETE_CATEGORY_SUCCESS = 'delete-category-success';
export const DELETE_CATEGORY_FAILURE = 'delete-category-failure';

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
      dispatch({
        type: GET_CATEGORIES_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
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
      dispatch({
        type: POST_CATEGORY_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function updateCategory(
  _id,
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: PATCH_CATEGORY_REQUEST });
      const endpoint = `/categories/${_id}`;

      const result = await query({
        data,
        endpoint,
        method: METHODS.patch,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: PATCH_CATEGORY_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: PATCH_CATEGORY_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: PATCH_CATEGORY_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function removeCategory(
  _id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_CATEGORY_REQUEST });
      const endpoint = `/categories/${_id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_CATEGORY_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}
