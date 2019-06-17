import { View } from 'react-native';
import styled from 'styled-components';

export const FewStyledContainer = styled.View`
  display: flex;
  align-items: center;
  ${({ paddingTop }) => (paddingTop ? 'padding-top: 20px' : null)}
`;
