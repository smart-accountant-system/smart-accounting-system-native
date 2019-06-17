import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

const RadioButton = ({ onPress, selected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {selected ? (
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: theme.colors.primary,
        }}
      />
    ) : null}
  </TouchableOpacity>
);

export default RadioButton;
