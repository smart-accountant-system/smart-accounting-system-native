import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import Swipeout from 'react-native-swipeout';

import FeatherIcon from './FeatherIcon';
import theme from '../constants/theme';

// This is swipe out btn object of react-native-swipeout
const defaultConfig = {
  backgroundColor: '#e22f2f',
  color: '#fff',
};

const RemoveIcon = ({ editable }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <FeatherIcon
      color={theme.colors.white}
      name={editable ? 'edit' : 'trash-2'}
    />
  </View>
);

// BUILDING...
export default ({ editable, onEdit, onRemove, children }) => {
  const listBtn = [
    {
      ...defaultConfig,
      text: i18n.t('actionRemove'),
      onPress: onRemove,
      component: <RemoveIcon />,
    },
  ];
  if (editable) {
    listBtn.unshift({
      text: i18n.t('actionEdit'),
      onPress: onEdit,
      component: <RemoveIcon editable />,
    });
  }

  return <Swipeout right={listBtn}>{children}</Swipeout>;
};
