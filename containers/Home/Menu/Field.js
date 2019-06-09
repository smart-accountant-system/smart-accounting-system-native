import { View } from 'react-native';
import styled from 'styled-components';

export const FieldContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
export const StyledField = styled.View`
  width: 50%;
  ${props => (props.left ? 'padding-right: 8px;' : '')}
  ${props => (props.right ? 'padding-left: 8px;' : '')}
`;
