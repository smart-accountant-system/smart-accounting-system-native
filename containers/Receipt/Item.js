import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props => (props.status ? '#5dba89' : '#e0aac6')};
`;

export default ({ onRemove, children, receipt, receiptDetail }) => (
  <SwipeoutRemove onRemove={onRemove}>
    <StyledItem status={receipt.status} onPress={() => receiptDetail(receipt)}>
      {children}
    </StyledItem>
  </SwipeoutRemove>
);
