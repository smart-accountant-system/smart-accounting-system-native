import React from 'react';
import { View } from 'react-native';

import Message from './Message';
import HeaderButton from './HeaderButton';

export default ({ onPress, message }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#333333',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <HeaderButton iconColor="#fff" onPress={onPress} />
    <Message>{message}</Message>
  </View>
);
