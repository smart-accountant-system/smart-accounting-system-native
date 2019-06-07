import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

import i18n from 'i18n-js';
import { getReceipts } from '../redux/actions';
import CustomerInfoWrapper from '../components/CustomerInfoItem';

import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
  FeatureText,
  FeatureHeaderWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import PaymentItem from '../components/PaymentItem';

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
