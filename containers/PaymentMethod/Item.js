import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';
import theme from '../../constants/theme';

const StyledContainer = styled.TouchableOpacity`
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  padding: 10px;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Typoraphy = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const CodeField = styled.Text`
  width: 20px;
  height: 20px;
  font-size: 5px;
  flex-wrap: wrap-reverse;
  background-color: #ddd;
  border-width: 1px;
  border-color: #111;
  margin-right: 8px;
  margin-top: 3px;
`;

const Name = styled.Text`
  font-size: 20;
  color: #111;
  flex-wrap: wrap;
  flex: 1;
`;

const Detail = styled.Text`
  color: ${props => props.color || '#333'};
`;

export default ({
  disabled,
  onEdit,
  editable,
  id,
  name,
  detail,
  time,
  onRemove,
  onPress,
  currentPaymentMethodId,
}) => (
  <SwipeoutRemove
    disabled={disabled}
    editable={editable}
    onEdit={onEdit}
    onRemove={onRemove}
  >
    <StyledContainer
      activeOpacity={0.5}
      onPress={onPress}
      backgroundColor={
        currentPaymentMethodId === id ? theme.colors.receive : '#fff'
      }
    >
      <View style={{ flex: 1, paddingRight: 4 }}>
        <Typoraphy>
          <CodeField>{id}</CodeField>
          <Name>{name}</Name>
        </Typoraphy>
        <Detail first>{detail}</Detail>
      </View>
      <Detail>{time}</Detail>
    </StyledContainer>
  </SwipeoutRemove>
);
