import React from 'react';
import i18n from 'i18n-js';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';

export default class AccountDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const account = navigation.getParam('account', '');
    const color = account.debit > account.credit ? '#438763' : '#ad6b8d';
    // I have no idea for this
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper>
          <Text
            style={{
              fontSize: 20,
              color,
            }}
          >
            {account.name}
          </Text>
          <Text>{account.description}</Text>
          <Text>{account.debit}</Text>
          <Text>{account.credit}</Text>
          <Text>{account.createdAt}</Text>
        </HomeBodyWrapper>
      </View>
    );
  }
}
