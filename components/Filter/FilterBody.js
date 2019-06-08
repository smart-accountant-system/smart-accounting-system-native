import React from 'react';
import { Animated } from 'react-native';

import styled from 'styled-components';

const FilterBodyContainer = styled(Animated.View)`
  background-color: #f1f1f1;
  overflow: hidden;
`;

export default ({ children, height }) => (
  <FilterBodyContainer style={{ height }}>{children}</FilterBodyContainer>
);
