import React from 'react';
import i18n from 'i18n-js';
import Swipeout from 'react-native-swipeout';

// This is swipe out btn object of react-native-swipeout
const defaultConfig = {
  backgroundColor: '#e22f2f',
  color: '#fff',
};
// BUILDING...
export default ({ editable, onEdit, onRemove, children }) => {
  const listBtn = [
    { ...defaultConfig, text: i18n.t('actionRemove'), onPress: onRemove },
  ];
  if (editable) {
    listBtn.unshift({
      text: i18n.t('actionEdit'),
      onPress: onEdit,
    });
  }

  return <Swipeout right={listBtn}>{children}</Swipeout>;
};
