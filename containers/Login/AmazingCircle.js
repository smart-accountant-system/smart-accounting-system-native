import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import background from '../../assets/login_bg.jpg';

export default AmazingCircle = styled.View`
    position: absolute;
    background-color: ${props => props.backgroundColor};
    height: 90px;
    width: 90px;
    border-radius: 45px;
    bottom: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

