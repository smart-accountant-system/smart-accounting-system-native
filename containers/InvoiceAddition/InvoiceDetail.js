import React from 'react';
import i18n from 'i18n-js';
import { View } from 'react-native';
import SwipeoutRemove from '../../components/SwipeoutRemove';

import { DetailItem, DescriptionHeader, FooterInvoice } from '../InvoiceDetail';

export default ({
  detail,
  navigation,
  totalCost,
  handleUpdateDate,
  handleRemoveDetail,
}) => (
  <View>
    {detail.map(({ key, product, quantity, unitPrice }, index) => (
      <SwipeoutRemove
        key={key}
        onRemove={() => handleRemoveDetail(key)}
        editable
        onEdit={() => {
          navigation.navigate('InvoiceProductAddition', {
            product: { key, product, quantity, unitPrice },
            handleUpdate: handleUpdateDate,
          });
        }}
      >
        {index === 0 && (
          <DescriptionHeader
            product={i18n.t('product')}
            quantity={i18n.t('quantity')}
            unitPrice={i18n.t('unitPrice')}
            cost={i18n.t('cost')}
          />
        )}
        <DetailItem
          product={product}
          quantity={quantity}
          unitPrice={unitPrice}
        />
      </SwipeoutRemove>
    ))}
    {detail.length > 0 && (
      <FooterInvoice color="#ad6b8d" totalCost={totalCost} />
    )}
  </View>
);
