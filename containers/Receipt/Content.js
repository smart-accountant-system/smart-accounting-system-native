import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const ReceiptContentContainer = styled.View`
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

const ReceiptName = styled.Text`
  font-size: 20;
  color: #111;
`;

const ReceiptDetail = styled.Text`
  margin-top: ${props => (props.first ? 8 : 0)}px;
  margin-bottom: 2px;
  color: ${props => props.color || '#333'};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px;` : '')}
  ${props => (props.italic ? 'font-style: italic;' : '')}
`;

const InforCostContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 5px;
`;

const ReceiptCodeField = styled.Text`
  width: 20px;
  height: 20px;
  font-size: 5px;
  flex-wrap: wrap-reverse;
  background-color: #ddd;
  border-width: 1px;
  border-color: #111;
  margin-right: 8px;
`;

const ReceiptTyporaphy = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ({ id, customer, payment, type, color, status, time, cost }) => (
  <ReceiptContentContainer>
    <View>
      <ReceiptTyporaphy>
        <ReceiptCodeField>{id}</ReceiptCodeField>
        <ReceiptName>{customer}</ReceiptName>
      </ReceiptTyporaphy>
      <ReceiptDetail first>{type}</ReceiptDetail>
      <ReceiptDetail>{payment}</ReceiptDetail>
      <ReceiptDetail color={color}>{status}</ReceiptDetail>
    </View>
    <InforCostContainer>
      <ReceiptDetail>{time}</ReceiptDetail>
      <NumberFormat
        value={cost}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => (
          <ReceiptDetail fontSize={18} color={color}>
            {value}
          </ReceiptDetail>
        )}
      />
    </InforCostContainer>
  </ReceiptContentContainer>
);
