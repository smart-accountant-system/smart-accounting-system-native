import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import theme from '../../constants/theme';

const SocialButtonWrapper = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ background }) => background || theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ background, name }) => (
  <TouchableOpacity>
    <SocialButtonWrapper background={background}>
      <FontAwesomeIcon color={theme.colors.white} name={name} />
    </SocialButtonWrapper>
  </TouchableOpacity>
);
