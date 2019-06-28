import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import theme from '../../constants/theme';

export const InvoiceDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const AmazingText = ({ hackPaddingTop, fontSize, onPress, content }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingTop: hackPaddingTop || 16,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: fontSize || 17,
        color: theme.colors.primary,
        textAlign: 'center',
      }}
    >
      {content}
    </Text>
  </TouchableOpacity>
);

export { default as TypePicker } from './TypePicker';
export { default as InvoiceDetail } from './InvoiceDetail';
