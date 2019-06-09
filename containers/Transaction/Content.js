import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const TransactionContentContainer = styled.View`
  padding-left: 8px;
  padding-right: 8px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TransactionName = styled.Text`
  font-size: ${props => props.fontSize || 20};
  color: ${props => props.color || '#111'};
  width: 33%;
  text-align: ${props => props.align || 'left'};
`;

const TransactionDetail = styled.Text`
  margin-top: ${props => (props.first ? 8 : 0)}px;
  margin-bottom: 2px;
  color: ${props => props.color || '#333'};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px;` : '')}
  ${props => (props.italic ? 'font-style: italic;' : '')}
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  overflow: hidden;
`;

const TransactionCodeField = styled.Text`
  width: 20px;
  height: 20px;
  font-size: 5px;
  flex-wrap: wrap-reverse;
  background-color: #ddd;
  border-width: 1px;
  border-color: #111;
  margin-right: 8px;
`;

const TransactionTyporaphy = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export default ({
  id,
  checkedBy,
  fromColor,
  toColor,
  fromAccount,
  toAccount,
  time,
  cost,
}) => (
  <TransactionContentContainer>
    <TransactionTyporaphy>
      <HeaderContainer>
        <TransactionCodeField>{id}</TransactionCodeField>
        <TransactionDetail fontSize={18}>{checkedBy}</TransactionDetail>
      </HeaderContainer>
      <TransactionDetail>{time}</TransactionDetail>
    </TransactionTyporaphy>
    <TransactionTyporaphy>
      <TransactionName color={fromColor}>{fromAccount}</TransactionName>
      <NumberFormat
        value={cost}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => (
          <TransactionName align="center" fontSize={18}>
            {value}
          </TransactionName>
        )}
      />
      <TransactionName align="right" color={toColor}>
        {toAccount}
      </TransactionName>
    </TransactionTyporaphy>
  </TransactionContentContainer>
);
