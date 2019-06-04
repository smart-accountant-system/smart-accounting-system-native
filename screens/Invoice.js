import React from 'react';
import i18n from 'i18n-js';
import { Localization } from 'expo';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import { en, vi } from '../constants/localization';
import theme from '../constants/theme';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

class Invoice extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <StatusBar barStyle="light-content" />
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <FeatherIcon color={theme.colors.white} name="user" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoice')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
      </View>
    );
  }
}

export default Invoice;
