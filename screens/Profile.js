/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

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
import { logout } from '../actions';

import { en, vi } from '../constants/localization';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

class Profile extends React.Component {
  handleLogout = () => {
    const { navigation } = this.props;
    this.props.logout({
      success: () => {
        navigation.navigate('Login');
      },
    });
  };

  render() {
    const { navigation, info } = this.props;
    console.log(info);
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
        <ScrollView>
          <ContentWrapper>
            <Avatar color={info.color}>
              <AvatarTypography color={info.color}>
                {info.fullname.substring(0, 1).toUpperCase()}
              </AvatarTypography>
            </Avatar>
            <AvatarTypography size="30" color={info.color}>
              {info.fullname}
            </AvatarTypography>
            <InforWrapper>
              <ProfileInfo name="user" info={info.username} />
              <ProfileInfo name="inbox" info={info.email} />
              <ProfileInfo name="phone" info={info.phone} />
              <ProfileInfo
                onPress={this.handleLogout}
                name="log-out"
                info="Logout"
              />
            </InforWrapper>
          </ContentWrapper>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  info: state.user.info,
});
const mapDispatchToProps = {
  logout,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
