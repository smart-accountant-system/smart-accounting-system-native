import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import FeatherIcon from './FeatherIcon';
import theme from '../constants/theme';

const InfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: space-between;
  /* height: 30px; */
`;

export default class ProfileInfo extends React.Component {
  render() {
    const { name, info, onPress, title } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 10,
          }}
        >
          <FeatherIcon color={theme.colors.grey} name={name} size={26} />
          <InfoWrapper>
            {title && (
              <Text
                style={{
                  color: theme.colors.grey,
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                {title}
              </Text>
            )}
            <Text style={{ fontSize: 15 }}>{info}</Text>
          </InfoWrapper>
        </View>
      </TouchableOpacity>
    );
  }
}
