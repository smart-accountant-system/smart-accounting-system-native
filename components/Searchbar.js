import React from 'react';
import i18n from 'i18n-js';
import { Searchbar } from 'react-native-paper';

export default ({ ...others }) => (
  <Searchbar
    {...others}
    placeholder={i18n.t('search')}
    style={{
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      borderBottomWidth: 2,
      borderBottomColor: '#f1f1f1',
    }}
  />
);
