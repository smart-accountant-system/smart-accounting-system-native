import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import {
  TransactionItemWrapper,
  AccountWrapper,
  DateWrapper,
} from '../containers/Transaction';
import theme from '../constants/theme';

export default ({ payment }) => (
  <TransactionItemWrapper>
    <AccountWrapper>
      <Text style={{ fontSize: 16 }}>{payment.category.name}</Text>
      <Text style={{ fontSize: 12, color: theme.colors.grey }}>
        {payment.description}
      </Text>
    </AccountWrapper>
    <DateWrapper>
      <Text style={{ color: theme.colors.grey, textAlign: 'right' }}>
        {moment(payment.createdAt).format('MMM DD, YYYY')}
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'right' }}>
        {payment.amountMoney}
      </Text>
    </DateWrapper>
  </TransactionItemWrapper>
);
