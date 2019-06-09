import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';
import FeatherIcon from '../../../components/FeatherIcon';

const StyledItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-flow: row wrap;

  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;

  shadow-color: #aaa;
  shadow-offset: 0;
  shadow-opacity: 1;
`;

const IconContainer = styled.View`
  background-color: ${props => props.color || '#8ec448'};
  border-radius: 30px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Typogaphy = styled.Text`
  font-size: 30;
  padding-left: 24px;
  color: #111;
`;

const DescriptionContainer = styled.View`
  margin-left: 16px;
`;

const Description = styled.Text`
  font-size: ${props => props.size || 18}px;
  color: ${props => props.color || '#111'};
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}px;` : '')}
`;

export default ({ onPress, color, icon, number, name, marginTop }) => (
  <StyledItem onPress={onPress}>
    <IconContainer color={color}>
      <FeatherIcon size={30} color="#fff" name={icon} />
    </IconContainer>
    <Typogaphy>{number}</Typogaphy>
    <DescriptionContainer>
      <Description marginTop={marginTop}>{name}</Description>
      <Description marginTop={4} size={15} color="#222">
        in total
      </Description>
    </DescriptionContainer>
  </StyledItem>
);
