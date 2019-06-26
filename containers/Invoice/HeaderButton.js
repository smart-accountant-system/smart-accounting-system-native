import React from 'react';
import styled from 'styled-components/native';
import FeatherIcon from '../../components/FeatherIcon';

const Wrapper = styled.TouchableOpacity.attrs({
  hitSlop: { top: 15, left: 15, bottom: 15, right: 15 },
})`
  position: absolute;
  top: 44px;
  right: 20px;
  justify-content: center;
  align-items: center;
`;

export default ({ iconName, iconSize, iconColor, ...props }) => (
  <Wrapper {...props}>
    <FeatherIcon
      color={iconColor || '#919191'}
      name={iconName || 'x'}
      size={iconSize || 30}
    />
  </Wrapper>
);
