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

export default class InvoiceDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const employee = navigation.getParam('employee', '');
    // NO NEED TO GET DETAIL
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeManagement')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('EmployeeDetail')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper>
          <Text>{JSON.stringify(employee)}</Text>
        </HomeBodyWrapper>
      </View>
    );
  }
}
