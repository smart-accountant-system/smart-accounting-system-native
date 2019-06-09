import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import {
  Header,
  Typography,
  FeatureText,
  HeaderWrapper,
  HomeBodyWrapper,
  FeatureHeaderWrapper,
} from '../containers/Home';
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
        <HomeBodyWrapper>
          <ScrollView>
            <FeatureHeaderWrapper>
              <FeatureText>{i18n.t('receipt')}</FeatureText>
            </FeatureHeaderWrapper>
            <ReceiptItem
              customer="FPT"
              id="#0000001"
              type={1}
              date="May 24, 2019"
              price="đ7,000,000"
            />
            <FeatureHeaderWrapper>
              <FeatureText>{i18n.t('balance')}</FeatureText>
            </FeatureHeaderWrapper>
          </ScrollView>
        </HomeBodyWrapper>
      </View>
    );
  }
}
