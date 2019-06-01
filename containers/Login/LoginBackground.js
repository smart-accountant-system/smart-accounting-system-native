import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import background from '../../assets/login_bg.jpg';
import Layout from '../../constants/Layout';

const LoginContainer = styled.ImageBackground`
  position: relative;
  height: ${props => props.height || Layout.deviceHeight};
  display: flex;
  align-items: center;
`;


export default LoginBackground = props => (
    <LoginContainer source={background}>
        {props.children}
    </LoginContainer>
)
