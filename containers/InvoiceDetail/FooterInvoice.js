import React from 'react';
import i18n from 'i18n-js';
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
      {i18n.t('totalCost')}
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
