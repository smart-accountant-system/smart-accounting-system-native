import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const AccountContentContainer = styled.View`
  margin-left: 8px;
  background-color: #fff;
  padding: 10px;
  padding-right: 18px;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;

  display: flex;
  flex-direction: column;
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
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : null)}
`;

const ItemRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
`;

export default ({ name, description, color, time, balanceType, balance }) => (
  <AccountContentContainer>
    <ItemRow>
      <AccountTyporaphy>{name}</AccountTyporaphy>
      <AccountDetail>{time}</AccountDetail>
    </ItemRow>
    <AccountDetail first>{description}</AccountDetail>
    <ItemRow end>
      <AccountDetail color={color}>{balanceType}</AccountDetail>
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
    </ItemRow>
  </AccountContentContainer>
);
