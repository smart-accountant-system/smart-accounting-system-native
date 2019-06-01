import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Layout from '../../constants/Layout';

export default TextInputWrapper = styled.TextInput`
  width: ${props => props.width || Layout.deviceWidth - 50};
  color: ${props => props.color || '#000'};
  background-color: ${props => props.color || '#fff'};
  height: 50px;
  padding: 10px;
  font-size: 18px;
  margin: 10px;
`;