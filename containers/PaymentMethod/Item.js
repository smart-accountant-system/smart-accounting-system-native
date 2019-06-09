import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

const StyledContainer = styled.TouchableOpacity`
  background-color: #fff;
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
  align-items: center;
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
`;

const Name = styled.Text`
  font-size: 20;
  color: #111;
`;

const Detail = styled.Text`
  color: ${props => props.color || '#333'};
`;

export default ({ id, name, detail, time }) => (
  <StyledContainer>
    <View>
      <Typoraphy>
        <CodeField>{id}</CodeField>
        <Name>{name}</Name>
      </Typoraphy>
      <Detail first>{detail}</Detail>
    </View>
    <Detail>{time}</Detail>
  </StyledContainer>
);
