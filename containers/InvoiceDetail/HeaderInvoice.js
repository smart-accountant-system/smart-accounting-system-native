import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  padding: 8px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({
  employeeUsername,
  employeeName,
  name,
  color,
  status,
  createdAt,
}) => (
  <Container>
    <Text style={{ fontSize: 22, fontWeight: '300' }}>{name} Invoice</Text>
    {employeeName && (
      <Text style={{ color: '#444', fontWeight: '300' }}>
        Added by{' '}
        <Text
          style={{
            color: '#444',
            fontWeight: '500',
          }}
        >
          {employeeUsername}@
          <Text style={{ textTransform: 'capitalize' }}>{employeeName}</Text>
        </Text>
      </Text>
    )}
    <Text
      style={{
        color: '#444',
        fontWeight: '300',
        paddingTop: 2,
        paddingBottom: 12,
      }}
    >
      {createdAt}
    </Text>
    <Text style={{ color }}>{status}</Text>
  </Container>
);
