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
} from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  isLogging: false,
  error: null,
  info: null,
  localization: Localization.locale,
  isLocaleSet: false,
  photo: null,
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
      return {
        ...state,
        isLogging: true,
        error: null,
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
      return {
        ...state,
        isLogging: false,
        error: action.payload,
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
    default:
      return state;
  }
};
