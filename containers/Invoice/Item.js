import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const StyledItem = styled.TouchableOpacity`
  background-color: ${props => (props.status ? '#5dba89' : '#e0aac6')};
`;

export default ({ children, invoice, invoiceDetail }) => (
  <StyledItem status={invoice.status} onPress={() => invoiceDetail(invoice)}>
    {children}
  </StyledItem>
);
