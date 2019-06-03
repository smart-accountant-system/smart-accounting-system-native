import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 20px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
`;

export const Typography = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20;
`;
