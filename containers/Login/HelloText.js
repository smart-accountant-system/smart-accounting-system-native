import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../constants/theme';

export default ({ content }) => (
  <View
    style={{
      paddingTop: 8,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 17,
        color: theme.colors.primary,
        textAlign: 'center',
      }}
    >
      {content}
    </Text>
  </View>
);
