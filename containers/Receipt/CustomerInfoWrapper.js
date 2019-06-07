import React from 'react';
import styled from 'styled-components/native';

export const CustomerInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 0.5px;
  border-top-color: ${({ theme }) => theme.colors.grey};
  border-top-width: 0.5px;
`;

export const InfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
