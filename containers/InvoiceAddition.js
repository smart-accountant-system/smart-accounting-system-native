import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { RadioButton } from '../components';
import theme from '../constants/theme';

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
  padding-bottom: 16px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 4px;
`;

export const Radio = ({ selected, onPress, label }) => (
  <RadioContainer>
    <RadioButton selected={selected} onPress={onPress} />
    <HihaText>{label}</HihaText>
  </RadioContainer>
);

export const InvoiceDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const AmazingText = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingTop: 16,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 17,
        color: theme.colors.primary,
      }}
    >
      + Add more product
    </Text>
  </TouchableOpacity>
);
