import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '../constants/theme';

export default class TransactionItem extends React.Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.grey} />
      </View>
    );
  }
}
