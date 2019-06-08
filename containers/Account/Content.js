import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const AccountContentContainer = styled.View`
  margin-left: 8px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
  border-top-color: #f1f1f1;
  border-top-width: 2px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AccountTyporaphy = styled.Text`
  font-size: 20;
  color: #111;
`;

const AccountDetail = styled.Text`
  margin-top: ${props => (props.first ? 16 : 0)}px;
  margin-bottom: ${props => (props.first ? 4 : 0)}px;
  color: ${props => props.color || '#333'};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : '')}
`;

const InforBalanceContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 5;
`;

export default ({ name, description, color, time, balanceType, balance }) => (
  <AccountContentContainer>
    <View>
      <AccountTyporaphy>{name}</AccountTyporaphy>
      <AccountDetail first>{description}</AccountDetail>
      <AccountDetail color={color}>{balanceType}</AccountDetail>
    </View>
    <InforBalanceContainer>
      <AccountDetail>{time}</AccountDetail>
      <NumberFormat
        value={balance}
        displayType="text"
        thousandSeparator
        prefix="₫"
        renderText={value => (
          <AccountDetail fontSize={18} color={color}>
            {value}
          </AccountDetail>
        )}
      />
    </InforBalanceContainer>
  </AccountContentContainer>
);
