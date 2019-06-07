import React from 'react';
import styled from 'styled-components/native';

export const BalanceWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 0.5px;
  border-top-color: ${({ theme }) => theme.colors.grey};
  border-top-width: 0.5px;
`;
