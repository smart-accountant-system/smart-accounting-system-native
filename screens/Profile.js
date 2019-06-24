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
import { logout } from '../redux/actions';
import { FeatherIcon, ProfileInfo } from '../components';

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
