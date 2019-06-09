import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

const EmployeeContainer = styled.TouchableOpacity`
  padding: 12px;
  background-color: #fff;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Typoraphy = styled.Text`
  color: #111;
  font-size: ${props => props.size || 20}px;
`;

const Detail = styled.Text`
  ${props =>
    props.bold
      ? `
    margin-top:8px;
    font-size: 15px;
  `
      : ''}
  color: ${props => props.color || '#333'};
`;

const DetailContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const Card = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AmazingStatus = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: 8px;
  background-color: ${props => props.color || '#321123'};
`;

export default ({ onPress, color, fullname, username, role, phone, email }) => (
  <EmployeeContainer onPress={onPress}>
    <View>
      <Card>
        <AmazingStatus color={color} />
        <Typoraphy>{fullname}</Typoraphy>
      </Card>
      <Detail bold color={color}>
        {role}
      </Detail>
      <Detail>{email}</Detail>
    </View>
    <DetailContainer>
      <Detail>{username}</Detail>
      <Typoraphy size={18}>{phone}</Typoraphy>
    </DetailContainer>
  </EmployeeContainer>
);
