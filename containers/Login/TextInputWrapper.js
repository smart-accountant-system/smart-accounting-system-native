import React from 'react';
import { TextInput } from 'react-native-paper';
import Layout from '../../constants/Layout';

export default props => {
  const { children, ...others } = props;
  return (
    <TextInput {...others} style={{ width: Layout.deviceWidth - 50, margin: 10, backgroundColor: 'white' }}>
      {children}
    </TextInput>
  );
}