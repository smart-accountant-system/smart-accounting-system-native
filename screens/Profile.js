/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import {
  HeaderWrapper,
  Header,
  Typography,
  ContentWrapper,
  Avatar,
  AvatarTypography,
  InforWrapper,
  AvatarPicture,
} from '../containers/Home';
import theme from '../constants/theme';
import { logout, changeLocalization } from '../redux/actions';
import { FeatherIcon, ProfileInfo } from '../components';
import { Localization } from '../containers/Profile';

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
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="x" />
            </TouchableOpacity>
            <Typography>{i18n.t('profile')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <ContentWrapper>
            <Avatar color={info.color}>
              {info.avatar ? (
                <AvatarPicture
                  borderRadius={100}
                  source={{
                    uri: info.avatar,
                  }}
                />
              ) : (
                <AvatarTypography color={info.color}>
                  {info.fullname.substring(0, 1).toUpperCase()}
                </AvatarTypography>
              )}
            </Avatar>
            <AvatarTypography size="24" color={info.color}>
              {info.fullname}
            </AvatarTypography>
            <InforWrapper>
              <Localization />
              <ProfileInfo
                title={i18n.t('fullname')}
                name="user"
                info={info.username}
              />
              <ProfileInfo
                title={i18n.t('email')}
                name="inbox"
                info={info.email}
              />
              <ProfileInfo
                title={i18n.t('phone')}
                name="phone"
                info={info.phone}
              />
              <ProfileInfo
                title={i18n.t('company')}
                name="printer"
                info={info.company.name}
              />
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
  changeLocalization,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
