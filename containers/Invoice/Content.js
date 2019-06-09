import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const InvoiceContentContainer = styled.View`
  margin-left: 8px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InvoiceName = styled.Text`
  font-size: 20;
  color: #111;
`;

const InvoiceDetail = styled.Text`
  margin-top: ${props => (props.first ? 16 : 0)}px;
  margin-bottom: ${props => (props.first ? 4 : 0)}px;
  color: ${props => props.color || '#333'};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : '')}
  ${props => (props.italic ? 'font-style: italic;' : '')}
`;

const InforCostContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 5px;
`;

const InvoiceCodeField = styled.Text`
  width: 20px;
  height: 20px;
  font-size: 5px;
  flex-wrap: wrap-reverse;
  background-color: #ddd;
  border-width: 1px;
  border-color: #111;
  margin-right: 8px;
`;

const InvoiceTyporaphy = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ({ id, name, color, status, time, cost }) => (
  <InvoiceContentContainer>
    <View>
      <InvoiceTyporaphy>
        <InvoiceCodeField>{id}</InvoiceCodeField>
        <InvoiceName>{name}</InvoiceName>
      </InvoiceTyporaphy>
      <InvoiceDetail first color={color}>
        {status}
      </InvoiceDetail>
    </View>
    <InforCostContainer>
      <InvoiceDetail>{time}</InvoiceDetail>
      <NumberFormat
        value={cost}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => (
          <InvoiceDetail fontSize={18} color={color}>
            {value}
          </InvoiceDetail>
        )}
      />
    </InforCostContainer>
  </InvoiceContentContainer>
);
