import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon, ReceiptItem } from '../components';

export default class TransactionDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const transaction = navigation.getParam('transaction', '');
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
        <ScrollView>
          <View>
            <Text>a</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
