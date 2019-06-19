/* eslint-disable react/no-this-in-sfc */
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

const Loading = () => (
  <Container>
    <ActivityIndicator size="small" color="#fff" />
  </Container>
);
const Icon = ({ editable, isLoading }) =>
  isLoading ? (
    <Loading />
  ) : (
    <Container>
      <FeatherIcon
        color={theme.colors.white}
        name={editable ? 'edit' : 'trash-2'}
      />
    </Container>
  );
export default class SwipeoutRemove extends React.Component {
  state = {
    isLoading: false,
  };

  componentWillReceiveProps = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { editable, onEdit, onRemove, children } = this.props;
    const { isLoading } = this.state;
    const that = this;
    const listBtn = [
      {
        ...defaultConfig,
        text: i18n.t('actionRemove'),
        component: <Icon isLoading={isLoading} />,
        onPress() {
          that.setState({ isLoading: true });
          if (!isLoading) {
            onRemove();
          }
        },
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
  }
}
