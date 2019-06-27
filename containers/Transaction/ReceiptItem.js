import React from 'react';
import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props => (props.status ? '#5dba89' : '#e0aac6')};
`;

export default ({ disabled, onRemove, children, receipt, onPress }) => (
  <SwipeoutRemove disabled={disabled} onRemove={onRemove}>
    <StyledItem status={receipt.status} onPress={onPress}>
      {children}
    </StyledItem>
  </SwipeoutRemove>
);
