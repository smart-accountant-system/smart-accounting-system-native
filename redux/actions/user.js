/* eslint-disable import/no-cycle */
import i18n from 'i18n-js';
import { SecureStore } from 'expo';
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';

export const LOGOUT = 'logout';
export const CHANGE_LOCALIZATION = 'change-localization';

export const UPLOAD_IMAGE_REQUEST = 'upload-image-request';
export const UPLOAD_IMAGE_SUCCESS = 'upload-image-success';
export const UPLOAD_IMAGE_FAILURE = 'upload-image-failure';

export function login(data, callback) {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST, payload: data });
      const endpoint = ENDPOINTS.login;
      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 304) {
        await SecureStore.setItemAsync(
          'userInfo',
          JSON.stringify({ ...data, fullname: result.data.fullname })
        );
        await SecureStore.setItemAsync('token', result.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: result.data,
        });
        callback.success();
      } else {
        dispatch({
          type: LOGIN_FAILURE,
        });
        callback.failure();
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
      callback.failure();
    }
  };
}

export function logout(callback) {
  callback.success();
  return {
    type: LOGOUT,
  };
}

export function changeLocalization(localization) {
  i18n.locale = localization;
  return {
    type: CHANGE_LOCALIZATION,
    payload: localization,
  };
}

export function uploadImage(data, callback) {
  return async dispatch => {
    try {
      dispatch({ type: UPLOAD_IMAGE_REQUEST });
      const endpoint = '/upload/avatar';
      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: UPLOAD_IMAGE_SUCCESS,
          payload: result.data,
        });
        callback.success();
      } else {
        dispatch({
          type: UPLOAD_IMAGE_FAILURE,
        });
        callback.failure();
      }
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_FAILURE,
        payload: error,
      });
      callback.failure();
    }
  };
}
