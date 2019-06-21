import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const Container = styled.View`
  padding: 8px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderInvoice = ({ name, color, status, createdAt }) => (
  <Container>
    <Text style={{ fontSize: 20 }}>{name} Invoice</Text>
    <Text style={{ color: '#444', paddingBottom: 8 }}>{createdAt}</Text>
    <Text style={{ color }}>{status}</Text>
  </Container>
);

const Label = styled.Text`
  font-size: 12px;
  width: ${({ width }) => width || '30%'};
  color: #666;
  text-transform: lowercase;
  ${({ right }) => (right ? 'text-align: right;' : null)}
`;

export const DescriptionHeader = ({ product, quantity, unitPrice, cost }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      marginBottom: -18,
    }}
  >
    <Label>{product}</Label>
    <Label right width="15%">
      {quantity}
    </Label>
    <Label right width="25%">
      {unitPrice}
    </Label>
    <Label right>{cost}</Label>
  </View>
);

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 1px;
`;

export const DetailItem = ({ product, quantity, unitPrice }) => (
  <ItemContainer>
    <Text style={{ width: '30%', fontSize: 18 }}>{product}</Text>
    <Text style={{ width: '15%', textAlign: 'right' }}>{quantity}</Text>
    <NumberFormat
      value={unitPrice}
      displayType="text"
      thousandSeparator
      prefix="₫"
      renderText={text => (
        <Text style={{ width: '25%', textAlign: 'right' }}>{text}</Text>
      )}
    />
    <NumberFormat
      value={unitPrice * quantity}
      displayType="text"
      thousandSeparator
      prefix="₫"
      renderText={text => (
        <Text style={{ width: '30%', textAlign: 'right' }}>{text}</Text>
      )}
    />
  </ItemContainer>
);

export const FooterInvoice = ({ totalCost, color }) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <Text
      style={{
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
      }}
    >
      total cost
    </Text>

    <NumberFormat
      value={totalCost}
      displayType="text"
      thousandSeparator
      prefix="₫"
      renderText={text => (
        <Text style={{ color, fontSize: 18, textAlign: 'right' }}>{text}</Text>
      )}
    />
  </View>
);
