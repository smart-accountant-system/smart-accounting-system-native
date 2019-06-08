import { View } from 'react-native';
import styled from 'styled-components';

export default styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  padding-top: ${props => (props.first ? 8 : 0)}px;
  justify-content: space-between;
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
`;
