import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import i18n from 'i18n-js';
import Swipeout from 'react-native-swipeout';
import styled from 'styled-components';

import FeatherIcon from './FeatherIcon';
import theme from '../constants/theme';

// This is swipe out btn object of react-native-swipeout
const defaultConfig = {
  backgroundColor: '#e22f2f',
  color: '#fff',
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = ({ editable }) => (
  <Container>
    <FeatherIcon
      color={theme.colors.white}
      name={editable ? 'edit' : 'trash-2'}
    />
  </Container>
);

const Loading = () => (
  <Container>
    <ActivityIndicator size="small" color="#fff" />
  </Container>
);

export default ({ editable, onEdit, onRemove, removeLoading, children }) => {
  const listBtn = [
    {
      ...defaultConfig,
      text: i18n.t('actionRemove'),
      onPress: onRemove,
      component: <Icon />,
    },
  ];
  if (editable) {
    listBtn.unshift({
      text: i18n.t('actionEdit'),
      onPress: onEdit,
      component: <Icon editable />,
    });
  }

  return <Swipeout right={listBtn}>{children}</Swipeout>;
};
