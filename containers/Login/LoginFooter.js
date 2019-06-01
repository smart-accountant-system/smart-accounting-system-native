import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Primary = styled.Text`
    color: ${props => props.color};
    font-weight: 400;
`;

const Secondary = styled.Text`
    color: #888;
    margin-top: 5px;
`;

const FooterContainer = styled.View`
    flex: 1;
    width: 100%;
    padding-bottom: 5px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export default props => (
    <FooterContainer>
        <Primary onPress={props.handleForgetPassword} color={props.color}>Forget your password</Primary>
        <Secondary>Don't have an account? 
            <Primary onPress={props.handleSignup} color={props.color}> Sign up</Primary>
        </Secondary>
    </FooterContainer>
);