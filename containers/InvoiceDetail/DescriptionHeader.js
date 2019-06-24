import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Label = styled.Text`
  font-size: 12px;
  width: ${({ width }) => width || '30%'};
  color: #666;
  padding: 2px;
  text-transform: lowercase;
  ${({ right }) => (right ? 'text-align: right;' : null)}
`;

export default ({ product, quantity, unitPrice, cost }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      marginBottom: -18,
    }}
  >
    <Label>{product}</Label>
    <Label right width="15%">
      {quantity}
    </Label>
    <Label right width="25%">
      {unitPrice}
    </Label>
    <Label right>{cost}</Label>
  </View>
);
