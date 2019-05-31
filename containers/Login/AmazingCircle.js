import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import background from '../../assets/login_bg.jpg';

export default AmazingCircle = styled.View`
    position: absolute;
    background-color: ${props => props.backgroundColor};
    height: 80px;
    width: 80px;
    border-radius: 40px;
    bottom: 13px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

