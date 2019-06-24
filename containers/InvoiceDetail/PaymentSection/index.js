import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  border-top-color: #f1f1f1;
  border-top-width: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.Text`
  font-size: 18px;
  font-weight: 300;
  padding-top: 8px;
  padding-bottom: 16px;
`;
const ItemContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const ItemField = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default ({ payments }) => (
  <Container>
    <Header>Recorded Payments</Header>
    {payments.map(
      ({
        _id,
        createdAt,
        type,
        category: { name },
        amountMoney,
        description,
      }) => (
        <ItemContainer key={_id}>
          <ItemField>
            <Text>Cat {name}</Text>
            <Text>
              {new Date(createdAt).toLocaleDateString(i18n.t('local'), {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </ItemField>

          <Text>
            {!type ? i18n.t('paymentIn') : i18n.t('paymentOut')} Payment
          </Text>
          <Text>{amountMoney}</Text>
          <Text>{description}</Text>
          <Text />
        </ItemContainer>
      )
    )}
  </Container>
);
