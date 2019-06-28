import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';
import FeatherIcon from '../../../components/FeatherIcon';

const StyledItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: ${props => (!props.mini ? 'row' : 'column')};
  align-items: center;

  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;

  border-color: #ddd;
  border-width: 1;

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
  padding-right: 24px;
  color: #111;
`;

const DescriptionContainer = styled.View`
  flex: 1;
`;

const Description = styled.Text`
  font-size: ${props => props.size || 18}px;
  color: ${props => props.color || '#111'};
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}px;` : '')}
`;

const ConceptualContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ({ onPress, color, icon, number, name, mini }) => (
  <StyledItem mini={mini} onPress={onPress}>
    <ConceptualContainer>
      <IconContainer color={color}>
        <FeatherIcon size={30} color="#fff" name={icon} />
      </IconContainer>
      <Typogaphy>{number}</Typogaphy>
    </ConceptualContainer>

    <DescriptionContainer>
      <Description marginTop={mini ? 16 : 0}>{name}</Description>
      <Description marginTop={4} size={15} color="#222">
        in total
      </Description>
    </DescriptionContainer>
  </StyledItem>
);
