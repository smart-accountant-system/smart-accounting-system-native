import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const StyledItem = styled.TouchableOpacity`
  background-color: ${({ type }) => (!type ? '#5dba89' : '#e0aac6')};
`;
export default ({ children, type, onPress }) => (
  <StyledItem type={type} onPress={onPress}>
    {children}
  </StyledItem>
);
