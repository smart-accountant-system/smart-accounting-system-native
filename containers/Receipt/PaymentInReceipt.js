import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';
import Item from './ItemWithoutRemove';
import Content from '../Account/Content';

export default ({ payment, onPress }) => (
  <Item type={payment.type} onPress={onPress}>
    <Content
      name={payment.category.name}
      description={payment.description}
      color={!payment.type ? '#438763' : '#ad6b8d'}
      balance={payment.amountMoney}
      balanceType={!payment.type ? i18n.t('paymentIn') : i18n.t('paymentOut')}
      time={new Date(payment.createdAt).toLocaleDateString(i18n.t('local'), {
        day: 'numeric',
        month: 'long',
      })}
    />
  </Item>
);

export const PaymentShow = ({ payment, onPress }) => (
  <View>
    <Text
      style={{
        fontSize: 17,
        color: '#85261c',
        textAlign: 'center',
        paddingTop: 16,
      }}
    >
      {i18n.t('payment')}
    </Text>
    <Item type={payment.type} onPress={onPress}>
      <Content
        noBorder
        name={payment.category.name}
        description={payment.description}
        color={!payment.type ? '#438763' : '#ad6b8d'}
        balance={payment.amountMoney}
        balanceType={!payment.type ? i18n.t('paymentIn') : i18n.t('paymentOut')}
        time={new Date(payment.createdAt).toLocaleDateString(i18n.t('local'), {
          day: 'numeric',
          month: 'long',
        })}
      />
    </Item>
  </View>
);
