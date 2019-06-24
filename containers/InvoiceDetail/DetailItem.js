import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

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

export default ({ product, quantity, unitPrice }) => (
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
