import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props =>
    props.debit > props.credit ? '#5dba89' : '#e0aac6'};
`;

export default ({ onRemove, children, account, accountDetail }) => (
  <SwipeoutRemove onRemove={onRemove}>
    <StyledItem
      debit={account.debit}
      credit={account.credit}
      onPress={() => accountDetail(account)}
    >
      {children}
    </StyledItem>
  </SwipeoutRemove>
);
