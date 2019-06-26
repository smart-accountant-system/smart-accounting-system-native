import { Localization } from 'expo';
import i18n from 'i18n-js';

import { en, vi } from '../constants/localization';
import store from '../redux/store';
import { changeLocalization } from '../redux/actions';

export const locales = ['en', 'vi'];

export const getLocaleString = locale => {
  switch (locale) {
    case 'en':
      return i18n.t('english');
    case 'vi':
      return i18n.t('vietnamese');
    default:
      return i18n.t('undefined');
  }
};

export const initLocale = () => {
  i18n.fallbacks = true;
  i18n.translations = { en, vi };
  // i18n.locale = 'en';
};

export const setLocale = () => {
  const { isLocaleSet, localization } = store.getState().user;
  if (isLocaleSet === false) {
    if (Localization.locale.includes('vi')) {
      store.dispatch(changeLocalization('vi'));
    } else {
      store.dispatch(changeLocalization('en'));
    }
  } else if (isLocaleSet === true) {
    store.dispatch(changeLocalization(localization));
  }
};
