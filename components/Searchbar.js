import React from 'react';
import { Searchbar } from 'react-native-paper';

export default ({ ...others }) => (
  <Searchbar
    {...others}
    style={{
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      borderBottomWidth: 2,
      borderBottomColor: '#f1f1f1',
    }}
  />
);
