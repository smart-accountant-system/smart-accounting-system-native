import React from 'react';
import styled from 'styled-components';
import i18n from 'i18n-js';

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
      {i18n.t('messageForgetPassword')}
    </Primary>
    <Secondary>
      {i18n.t('messageHaveNoAccount')}
      <Primary onPress={handleSignup} color={color}>
        {' '}
        {i18n.t('signup')}
      </Primary>
    </Secondary>
  </FooterContainer>
);
