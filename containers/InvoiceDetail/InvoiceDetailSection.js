import React from 'react';
import { View } from 'react-native';

export default ({}) => (
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
