import React from 'react';
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

export default ({ handleForgetPassword, color, handleSignup }) => (
  <FooterContainer>
    <Primary onPress={handleForgetPassword} color={color}>
      Forget your password
    </Primary>
    <Secondary>
      Don't have an account?
      <Primary onPress={handleSignup} color={color}>
        {' '}
        Sign up
      </Primary>
    </Secondary>
  </FooterContainer>
);
