import React from 'react';
import { View } from 'react-native';
import PaymentInReceipt from './PaymentInReceipt';

export default ({ payments, ...props }) => (
  <View>
    {payments.map(payment => (
      <PaymentInReceipt
        key={payment._id}
        payment={payment}
        onPress={() => {
          props.addPaymentToReceipt(payment);
          props.navigation.navigate('ReceiptAddition');
        }}
      />
    ))}
  </View>
);
