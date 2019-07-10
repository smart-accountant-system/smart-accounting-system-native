import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {
  TransactionItemWrapper,
  AccountWrapper,
  DateWrapper,
} from '../containers/Transaction';
import theme from '../constants/theme';

export default class ReceiptItem extends React.Component {
  render() {
    const { customer, type, date, price, item } = this.props;
    return (
      <TransactionItemWrapper>
        <AccountWrapper>
          <Text style={{ fontSize: 16 }}>{customer}</Text>
          <Text
            style={{
              fontSize: 16,
              color: type === 0 ? theme.colors.pay : theme.colors.receive,
            }}
          >
            {type === 0 ? 'PAID' : 'RECEIVED'}
          </Text>
        </AccountWrapper>
        <DateWrapper>
          <Text style={{ color: theme.colors.grey, textAlign: 'right' }}>
            {date}
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'right' }}>{price}</Text>
        </DateWrapper>
      </TransactionItemWrapper>
    );
  }
}
