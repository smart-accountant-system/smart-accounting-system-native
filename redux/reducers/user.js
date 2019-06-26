/* eslint-disable no-plusplus */
import { Localization } from 'expo';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHANGE_LOCALIZATION,
} from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  isLogging: false,
  error: null,
  info: null,
  localization: Localization.locale,
  isLocaleSet: false,
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
        info: { ...action.payload, color: getRandomColor() },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLogging: false,
        error: action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    case CHANGE_LOCALIZATION:
      return {
        ...state,
        localization: action.payload,
        isLocaleSet: true,
      };
    default:
      return state;
  }
};
