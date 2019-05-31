import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import background from '../../assets/login_bg.jpg';

const LoginContainer = styled.ImageBackground`
  position: relative;
  height: 40%;
  display: flex;
  align-items: center;
`;


export default LoginScreenSwappper = props => (
    <LoginContainer source={background}>
        {props.children}
    </LoginContainer>
)
