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
import { FeatherIcon, PaymentItem } from '../components';
import CustomerInfoWrapper from '../components/CustomerInfoItem';

export default class ReceiptDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', '');
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Receipt')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('receipt')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper>
          <ScrollView>
            <FeatureHeaderWrapper>
              <FeatureText>{i18n.t('payment')}</FeatureText>
            </FeatureHeaderWrapper>
            <PaymentItem payment={item.payment} />
            <FeatureHeaderWrapper>
              <FeatureText>{i18n.t('customer')}</FeatureText>
            </FeatureHeaderWrapper>
            <CustomerInfoWrapper customer={item.customer} />
          </ScrollView>
        </HomeBodyWrapper>
      </View>
    );
  }
}
