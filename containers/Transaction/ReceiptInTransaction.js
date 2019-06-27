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
          ? i18n.t('receiptVoucher')
          : i18n.t('paymentVoucher')
      }
      color={receipt.status ? '#438763' : '#ad6b8d'}
      status={
        receipt.status
          ? i18n.t('receiptRecoredAsTransaction')
          : i18n.t('receiptNotRecoredAsTransaction')
      }
      cost={receipt.payment.amountMoney}
      time={new Date(receipt.createdAt).toLocaleDateString(i18n.t('local'), {
        day: 'numeric',
        month: 'long',
      })}
    />
  </ReceiptItem>
);
