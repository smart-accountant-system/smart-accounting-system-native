import React from 'react';
import styled from 'styled-components';

export const HomeBodyWrapper = styled.View`
  display: flex;
  flex: 1;
`;

export const FeatureHeaderWrapper = styled.View`
  margin: 20px;
`;

export const FeatureText = styled.Text`
  color: ${({ theme }) => theme.colors.grey || '#888'}
  font-size: 14;
`;

export const FeatureContent = styled.View`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey};
  width: 100%;
`;
