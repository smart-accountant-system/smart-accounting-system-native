import React from 'react';
import i18n from 'i18n-js';
import Swipeout from 'react-native-swipeout';

// This is swipe out btn object of react-native-swipeout
const defaultConfig = {
  backgroundColor: '#e22f2f',
  color: '#fff',
};

export default ({ onRemove, children }) => (
  <Swipeout
    right={[
      { ...defaultConfig, text: i18n.t('actionRemove'), onPress: onRemove },
    ]}
  >
    {children}
  </Swipeout>
);
