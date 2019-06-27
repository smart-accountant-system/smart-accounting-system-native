import React from 'react';
import i18n from 'i18n-js';

import ReceiptItem from './ReceiptItem';
import { ReceiptContent } from '../Receipt';

export default ({ onPress, receipt }) => (
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
    />
  </ReceiptItem>
);
