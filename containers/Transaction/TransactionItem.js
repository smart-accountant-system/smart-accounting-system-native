import styled from 'styled-components';

export const TransactionItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 20px;
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 0.5px;
  border-top-color: ${({ theme }) => theme.colors.grey};
  border-top-width: 0.5px;
`;

export const AccountWrapper = styled.View`
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 60px;
  justify-content: space-between;
`;

export const DateWrapper = styled.View`
  display: flex;
  flex-direction: column;
  text-align: right;
  height: 60px;
  justify-content: space-between;
`;
