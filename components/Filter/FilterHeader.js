import React from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import theme from '../../constants/theme';
import FeatherIcon from '../FeatherIcon';

const FilterContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 4px;
`;

const FilterTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const FilterTitle = styled.Text`
  font-size: 16;
  color: #444;
  padding-left: 20;
`;

export default ({ title, isExpand, onPress }) => (
  <FilterContainer onPress={onPress}>
    <FilterTitleContainer>
      <FeatherIcon color={theme.colors.primary} name="filter" />
      <FilterTitle>{title}</FilterTitle>
    </FilterTitleContainer>
    <FeatherIcon
      color={theme.colors.primary}
      name={isExpand ? 'chevron-up' : 'chevron-down'}
    />
  </FilterContainer>
);
