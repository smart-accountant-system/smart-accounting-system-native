import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { RadioButton } from '../components';

const RadioContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HihaText = styled.Text`
  padding-left: 8px;
`;

export const RadioGroup = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 16px;
`;

export const Radio = ({ selected, onPress, label }) => (
  <RadioContainer>
    <RadioButton selected={selected} onPress={onPress} />
    <HihaText>{label}</HihaText>
  </RadioContainer>
);
