import React from 'react';
import { TextInput } from 'react-native-paper';

export default ({ style, ...others }) => (
  <TextInput
    {...others}
    autoCapitalize="none"
    style={{ ...style, backgroundColor: '#fff' }}
  />
);
