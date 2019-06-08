import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import FeatherIcon from '../FeatherIcon';

const Container = styled.View`
  width: 50%;
  padding-right: ${props => (props.first ? 8 : 0)}px;
  padding-left: ${props => (props.second ? 8 : 0)}px;
`;

const TimeField = styled.View`
  border-width: 1px;
  border-color: #aaa;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default ({ title, first, second, date, showDateTimePicker }) => (
  <Container first={first} second={second}>
    <Text>{title}</Text>
    <TouchableOpacity onPress={() => showDateTimePicker(title)}>
      <TimeField>
        <Text>{date}</Text>
        <FeatherIcon size={20} name="chevron-down" color="#999" />
      </TimeField>
    </TouchableOpacity>
  </Container>
);
