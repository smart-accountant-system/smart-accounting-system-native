import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';

export default class TransactionDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('transactionDetail')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper />
      </View>
    );
  }
}
