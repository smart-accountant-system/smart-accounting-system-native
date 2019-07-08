/* eslint-disable no-plusplus */
import { Localization } from 'expo';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHANGE_LOCALIZATION,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  PATCH_PROFILE_REQUEST,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  isLogging: false,
  error: null,
  info: null,
  localization: Localization.locale,
  isLocaleSet: false,
  photo: null,
  registerUsername: '',
  registerPassword: '',
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; ++i) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
    case PATCH_PROFILE_REQUEST:
      return {
        ...state,
        isLogging: true,
        error: null,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isLogging: true,
        error: null,
        registerPassword: action.payload.employee.password,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLogging: false,
        error: null,
        info: { ...action.payload, color: getRandomColor(), token: undefined },
      };
    case LOGIN_FAILURE:
    case UPLOAD_IMAGE_FAILURE:
    case PATCH_PROFILE_FAILURE:
      return {
        ...state,
        isLogging: false,
        error: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLogging: false,
        error: action.payload,
        registerPassword: '',
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
        localization: state.localization,
        isLocaleSet: true,
      };
    case CHANGE_LOCALIZATION:
      return {
        ...state,
        localization: action.payload,
        isLocaleSet: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        photo: action.payload,
      };
    case PATCH_PROFILE_SUCCESS:
      return {
        ...state,
        info: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerUsername: action.payload.employee.username,
        registerPassword: action.payload.employee.password,
      };
    default:
      return state;
  }
};
