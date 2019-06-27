import React from 'react';
import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props =>
    props.debit > props.credit ? '#5dba89' : '#e0aac6'};
`;

export default ({
  disabled,
  editable,
  onRemove,
  children,
  account,
  accountDetail,
}) => (
  <SwipeoutRemove disabled={disabled} editable={editable} onRemove={onRemove}>
    <StyledItem
      debit={account.debit}
      credit={account.credit}
      onPress={() => accountDetail(account)}
    >
      {children}
    </StyledItem>
  </SwipeoutRemove>
);
