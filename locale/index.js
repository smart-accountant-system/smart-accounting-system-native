import { Localization } from 'expo';
import i18n from 'i18n-js';

import en from './en';
import vi from './vi';
import store from '../redux/store';
import { changeLocalization } from '../redux/actions';

export const initLocale = () => {
  i18n.fallbacks = true;
  i18n.translations = { en, vi };
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
