import React from 'react';
import NumberFormat from 'react-number-format';
import InterestTextInput from './InterestTextInput';

export default ({ label, amountMoney, onChangeText }) => (
  <NumberFormat
    value={amountMoney}
    displayType="text"
    thousandSeparator
    prefix="₫"
    renderText={value => (
      <InterestTextInput
        label={label}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    )}
  />
);
