import { View } from 'react-native';
import styled from 'styled-components';

export const FieldContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
export const StyledField = styled.View`
  width: 50%;
  padding-left: ${props => (props.right ? '8px' : '0px')};
  padding-right: ${props => (props.left ? '8px' : '0px')};
`;
