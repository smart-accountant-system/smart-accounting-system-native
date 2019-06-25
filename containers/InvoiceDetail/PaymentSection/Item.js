import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import SwipeoutRemove from '../../../components/SwipeoutRemove';

const StyledItem = styled.TouchableOpacity`
  background-color: ${({ type }) => (!type ? '#5dba89' : '#e0aac6')};
`;
export default ({ onRemove, children, type }) => (
  <SwipeoutRemove onRemove={onRemove}>
    <StyledItem type={type} onPress={() => {}}>
      {children}
    </StyledItem>
  </SwipeoutRemove>
);
