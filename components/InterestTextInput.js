import React from 'react';
import { TextInput } from 'react-native-paper';

export default props => (
  <TextInput
    {...props}
    autoCapitalize="none"
    style={{ backgroundColor: '#fff' }}
  />
);
