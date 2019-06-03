import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import background from '../../assets/login_bg.jpg';
import Layout from '../../constants/Layout';

const LoginContainer = styled.ImageBackground`
  position: relative;
  height: ${props => props.height || Layout.deviceHeight};
  display: flex;
  align-items: center;
`;

export default ({ children }) => (
  <LoginContainer source={background}>{children}</LoginContainer>
);
