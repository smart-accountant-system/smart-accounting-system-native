import React from 'react';
import i18n from 'i18n-js';
import styled from 'styled-components';
import Item from './ItemWithoutRemove';
import Content from '../Account/Content';
import PaymentInReceipt from './PaymentInReceipt';

const Container = styled.View`
  padding-top: 8px;
`;
export default ({ payments, ...props }) => (
  <Container>
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
  </Container>
);
