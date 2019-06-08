import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props =>
    props.debit > props.credit ? '#5dba89' : '#e0aac6'};
`;

export default ({ children, account, accountDetail }) => (
  <StyledItem
    debit={account.debit}
    credit={account.credit}
    onPress={() => accountDetail(account)}
  >
    {children}
  </StyledItem>
);
