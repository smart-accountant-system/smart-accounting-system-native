import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import NumberFormat from 'react-number-format';

export const TAccount = ({ currentAccount }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      borderWidth: 2,
      borderColor: '#f1f1f1',
    }}
  >
    <View
      style={{
        width: '50%',
        borderRightWidth: 1,
        borderRightColor: '#f1f1f1',
        padding: 8,
      }}
    >
      <Label>Debit</Label>
      <NumberFormat
        value={currentAccount.debit}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => <Currency color="#438763">{value}</Currency>}
      />
    </View>
    <View
      style={{
        width: '50%',
        padding: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#f1f1f1',
      }}
    >
      <Label align="right">Credit</Label>
      <NumberFormat
        value={currentAccount.credit}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => (
          <Currency color="#ad6b8d" align="right">
            {value}
          </Currency>
        )}
      />
    </View>
  </View>
);

const Label = styled.Text`
  color: #444;
  font-size: 12px;
  text-align: ${({ align }) => align || 'left'};
`;

const Currency = styled.Text`
  font-size: 18px;
  color: ${({ color }) => color || '#000'};
  text-align: ${({ align }) => align || 'left'};
`;
