import React from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';

import { Localization } from 'expo';
import i18n from 'i18n-js';
import {
  HeaderWrapper,
  Header,
  Typography,
  ContentWrapper,
  Avatar,
  AvatarTypography,
  InforWrapper,
} from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import ProfileInfo from '../components/ProfileInfo';

import { en, vi } from '../constants/localization';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

class Profile extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <StatusBar barStyle="light-content" />
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="x" />
            </TouchableOpacity>
            <Typography>{i18n.t('profile', { locale: 'en' })}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ContentWrapper>
          <Avatar />
          <AvatarTypography>Nhat Quang</AvatarTypography>
          <InforWrapper>
            <ProfileInfo name="target" info="nhatquang" />
            <ProfileInfo name="target" info="nhatquang" />
            <ProfileInfo name="upload" info="Logout" />
          </InforWrapper>
        </ContentWrapper>
      </View>
    );
  }
}

export default Profile;
