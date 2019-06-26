import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';

import HeaderInvoice from './HeaderInvoice';
import FooterInvoice from './FooterInvoice';
import DescriptionHeader from './DescriptionHeader';
import DetailItem from './DetailItem';

export { default as PaymentSection } from './PaymentSection';
export default ({ currentInvoice }) => {
  const name =
    currentInvoice.type === 0
      ? i18n.t('purchasedInvoice')
      : i18n.t('selledInvoice');
  const color = currentInvoice.status ? '#438763' : '#ad6b8d';
  const status = currentInvoice.status ? i18n.t('paid') : i18n.t('unpaid');
  const {
    createdBy: { fullname, username },
    createdAt,
    totalCost,
  } = currentInvoice;
  return (
    <View>
      <HeaderInvoice
        name={name}
        employeeUsername={username}
        employeeName={fullname}
        color={color}
        status={status}
        createdAt={new Date(createdAt).toLocaleDateString(i18n.t('local'), {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      />
      <DescriptionHeader
        product={i18n.t('product')}
        quantity={i18n.t('quantity')}
        unitPrice={i18n.t('unitPrice')}
        cost={i18n.t('cost')}
      />
      {currentInvoice.detail.map(({ product, quantity, unitPrice }) => (
        <DetailItem
          key={Math.random()}
          product={product}
          quantity={quantity}
          unitPrice={unitPrice}
        />
      ))}
      <FooterInvoice color={color} totalCost={totalCost} />
    </View>
  );
};
