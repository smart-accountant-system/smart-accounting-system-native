import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';

import ReceiptItem from './ReceiptItem';
import { ReceiptContent } from '../Receipt';

const ReceiptInTransaction = ({ onPress, receipt, noBorder }) => (
  <ReceiptItem onPress={onPress} disabled receipt={receipt} key={receipt._id}>
    <ReceiptContent
      id={receipt._id}
      customer={receipt.customer.name}
      Transaction={receipt.payment.category.name}
      type={
        receipt.payment.type === 0
          ? 'Receipt voucher' // phieu thu
          : 'Payment voucher' // phieu chi
      }
      color={receipt.status ? '#438763' : '#ad6b8d'}
      status={
        receipt.status
          ? 'Recorded as a transaction'
          : 'Not record as a transaction yet'
      }
      cost={receipt.payment.amountMoney}
      time={new Date(receipt.createdAt).toLocaleDateString(i18n.t('local'), {
        day: 'numeric',
        month: 'long',
      })}
      noBorder={noBorder}
    />
  </ReceiptItem>
);

export const ReceiptShow = ({ receipt, onPress }) => (
  <View>
    <Text
      style={{
        fontSize: 17,
        color: '#85261c',
        textAlign: 'center',
        paddingTop: 16,
      }}
    >
      {i18n.t('receipt')}
    </Text>
    <ReceiptInTransaction receipt={receipt} onPress={onPress} noBorder />
  </View>
);

export default ReceiptInTransaction;
