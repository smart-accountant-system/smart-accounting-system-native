import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const NiceView = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 200px;
`;

const EmptyText = styled.Text`
  color: #444;
`;
export default ({ name }) => (
  <NiceView>
    <EmptyText>There is no {name}.</EmptyText>
  </NiceView>
);
