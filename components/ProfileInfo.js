import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import FeatherIcon from './FeatherIcon';
import theme from '../constants/theme';

const Field = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #aaa;
  border-bottom-width: ${({ last }) => (last ? 0 : 0.5)};
  width: 100%;

  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const TitleSection = styled.View`
  width: 40%;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 15;
  padding-left: 8;
`;

const Content = styled.Text`
  font-size: 15;
  flex: 1;
  text-align: right;
  color: ${theme.colors.grey};
`;

export default class ProfileInfo extends React.Component {
  render() {
    const { name, info, onPress, title, last } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Field last={last}>
          <TitleSection>
            <FeatherIcon marginBottom={2} name={name} size={26} />
            <Title>{title}</Title>
          </TitleSection>
          <Content>{info}</Content>
        </Field>
      </TouchableOpacity>
    );
  }
}
