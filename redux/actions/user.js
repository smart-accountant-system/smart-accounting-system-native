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

export const PATCH_PROFILE_REQUEST = 'patch-profile-request';
export const PATCH_PROFILE_SUCCESS = 'patch-profile-success';
export const PATCH_PROFILE_FAILURE = 'patch-profile-failure';

export const REGISTER_REQUEST = 'register-request';
export const REGISTER_SUCCESS = 'register-success';
export const REGISTER_FAILURE = 'register-failure';

export const SEND_RESET_PASSWORD_REQUEST = 'send-reset-password-request';
export const SEND_RESET_PASSWORD_SUCCESS = 'send-reset-password-success';
export const SEND_RESET_PASSWORD_FAILURE = 'send-reset-password-failure';

export const RESET_PASSWORD_REQUEST = 'reset-password-request';
export const RESET_PASSWORD_SUCCESS = 'reset-password-success';
export const RESET_PASSWORD_FAILURE = 'reset-password-failure';

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
        callback.success(result.data);
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

export function updateProfile(
  _id,
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: PATCH_PROFILE_REQUEST });
      const endpoint = `/employees/${_id}`;

      const result = await query({
        data,
        endpoint,
        method: METHODS.patch,
      });

      if (result.status === 200 || result.status === 201) {
        const { username, fullname } = data;
        await SecureStore.setItemAsync(
          'userInfo',
          JSON.stringify({ username, fullname })
        );
        dispatch({
          type: PATCH_PROFILE_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: PATCH_PROFILE_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: PATCH_PROFILE_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function register(data, callback) {
  return async dispatch => {
    try {
      dispatch({ type: REGISTER_REQUEST, payload: data });
      const endpoint = '/register';
      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (
        result.status === 200 ||
        result.status === 304 ||
        result.status === 201
      ) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: result.data,
        });
        callback.success();
      } else {
        dispatch({
          type: REGISTER_FAILURE,
        });
        callback.failure();
      }
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error,
      });
      callback.failure();
    }
  };
}

export function sendResetPassword(username, callback) {
  return async dispatch => {
    try {
      dispatch({ type: SEND_RESET_PASSWORD_REQUEST });
      const endpoint = `/employees/rspw/send-email/${username}`;
      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (
        result.status === 200 ||
        result.status === 304 ||
        result.status === 201
      ) {
        dispatch({
          type: SEND_RESET_PASSWORD_SUCCESS,
          payload: result.data,
        });
        callback.success();
      } else {
        dispatch({
          type: SEND_RESET_PASSWORD_FAILURE,
        });
        callback.failure();
      }
    } catch (error) {
      dispatch({
        type: SEND_RESET_PASSWORD_FAILURE,
        payload: error,
      });
      callback.failure();
    }
  };
}

export function resetPassword(data, token, callback) {
  return async dispatch => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const endpoint = `/employees/rspw/${token}`;
      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (
        result.status === 200 ||
        result.status === 304 ||
        result.status === 201
      ) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: result.data,
        });
        callback.success();
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILURE,
        });
        callback.failure();
      }
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
        payload: error,
      });
      callback.failure();
    }
  };
}
