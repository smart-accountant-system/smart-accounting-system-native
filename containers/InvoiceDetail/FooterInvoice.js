import React from 'react';
import { View, Text } from 'react-native';
import NumberFormat from 'react-number-format';

export default ({ totalCost, color }) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <Text
      style={{
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
      }}
    >
      total cost
    </Text>

    <NumberFormat
      value={totalCost}
      displayType="text"
      thousandSeparator
      prefix="₫"
      renderText={text => (
        <Text style={{ color, fontSize: 18, textAlign: 'right' }}>{text}</Text>
      )}
    />
  </View>
);
