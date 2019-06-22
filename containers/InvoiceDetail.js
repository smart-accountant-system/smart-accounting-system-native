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

export const HeaderInvoice = ({
  employeeUsername,
  employeeName,
  name,
  color,
  status,
  createdAt,
}) => (
  <Container>
    <Text style={{ fontSize: 22, fontWeight: '300' }}>{name} Invoice</Text>
    {employeeName && (
      <Text style={{ color: '#444', fontWeight: '300' }}>
        Added by{' '}
        <Text
          style={{
            color: '#444',
            fontWeight: '500',
          }}
        >
          {employeeUsername}@
          <Text style={{ textTransform: 'capitalize' }}>{employeeName}</Text>
        </Text>
      </Text>
    )}
    <Text
      style={{
        color: '#444',
        fontWeight: '300',
        paddingTop: 2,
        paddingBottom: 12,
      }}
    >
      {createdAt}
    </Text>
    <Text style={{ color }}>{status}</Text>
  </Container>
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

const Label = styled.Text`
  font-size: 12px;
  width: ${({ width }) => width || '30%'};
  color: #666;
  padding: 2px;
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
  border-bottom-color: #f1f1f1;
  border-bottom-width: 1px;
`;

const FieldContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${({ width }) => width || '30%'};
  height: 100%;
  padding: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  ${({ notborderRight }) =>
    !notborderRight
      ? `
      border-right-color: #f1f1f1;
      border-right-width: 1px;`
      : null}
`;

const Infor = styled.Text`
  text-align: right;
  width: 100%;
`;

export const DetailItem = ({ product, quantity, unitPrice }) => (
  <ItemContainer>
    <FieldContainer>
      <Text style={{ fontSize: 18 }}>{product}</Text>
    </FieldContainer>
    <FieldContainer width="15%">
      <Infor>{quantity}</Infor>
    </FieldContainer>

    <FieldContainer width="25%">
      <NumberFormat
        value={unitPrice}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={text => <Infor>{text}</Infor>}
      />
    </FieldContainer>
    <FieldContainer notborderRight width="30%">
      <NumberFormat
        value={unitPrice * quantity}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={text => <Infor>{text}</Infor>}
      />
    </FieldContainer>
  </ItemContainer>
);
