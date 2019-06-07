import React from 'react';
import { Text } from 'react-native';

import {
  TransactionItemWrapper,
  AccountWrapper,
  DateWrapper,
} from '../containers/Transaction';
import theme from '../constants/theme';

export default class TransactionItem extends React.Component {
  render() {
    const { fromAccount, toAccount, price, date } = this.props;
    return (
      <TransactionItemWrapper>
        <AccountWrapper>
          <Text style={{ fontSize: 16 }}>{fromAccount}</Text>
          <Text style={{ fontSize: 16 }}>{toAccount}</Text>
        </AccountWrapper>
        <DateWrapper>
          <Text style={{ color: theme.colors.grey }}>{date}</Text>
          <Text style={{ fontSize: 16 }}>{price}</Text>
        </DateWrapper>
      </TransactionItemWrapper>
    );
  }
}
