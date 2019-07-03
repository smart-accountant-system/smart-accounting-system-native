/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { ImagePicker, Permissions, Constants } from 'expo';
import { API_URL } from '../constants/api';

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

import { AmazingText } from '../containers/InvoiceAddition';
import theme from '../constants/theme';
import {
  logout,
  changeLocalization,
  uploadImage,
  updateProfile,
} from '../redux/actions';
import { FeatherIcon, ProfileInfo } from '../components';
import { Localization } from '../containers/Profile';
import { handle401 } from '../constants/strategies';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { info } = this.props;
    this.state = {
      image: info.avatar,
    };
  }

  handleLogout = () => {
    const { navigation } = this.props;
    this.props.logout({
      success: () => {
        navigation.navigate('Login');
      },
    });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    const { info } = this.props;
    await this.getPermissionAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    });

    const { username, fullname, role, email, phone } = info;
    if (!result.cancelled) {
      this.props.uploadImage(this.createFormData(result), {
        success: data => {
          this.props.updateProfile(
            data.user,
            {
              username,
              fullname,
              role,
              email,
              phone,
              avatar: `${API_URL}/upload/${data.thumbName}`,
            },
            {
              success: () => {},
              failure: () => {},
              handle401: () =>
                handle401({
                  logout: this.props.logout,
                  navigation: this.props.navigation,
                }),
            }
          );
        },
        failure: () => {},
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      });
      this.setState({ image: result.uri });
    }
  };

  createFormData = photo => {
    const data = new FormData();

    const localUri =
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');

    const filename = localUri.split('/').pop();

    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    data.append('file', {
      name: filename,
      type,
      uri: localUri,
    });

    return data;
  };

  render() {
    const { navigation, info } = this.props;
    const { image } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="x" />
            </TouchableOpacity>
            <Typography>{i18n.t('profile')}</Typography>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', { info })}
            >
              <FeatherIcon color={theme.colors.white} name="edit" />
            </TouchableOpacity>
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <ContentWrapper>
            <TouchableOpacity onPress={this._pickImage}>
              <Avatar color={info.color}>
                {image ? (
                  <AvatarPicture
                    borderRadius={100}
                    source={{
                      uri: image,
                    }}
                  />
                ) : (
                  <AvatarTypography color={info.color}>
                    {info.fullname.substring(0, 1).toUpperCase()}
                  </AvatarTypography>
                )}
              </Avatar>
            </TouchableOpacity>
            <AvatarTypography text={1} size="26">
              {info.fullname}
            </AvatarTypography>
            <InforWrapper>
              <ProfileInfo
                title={i18n.t('username')}
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
                last={1}
                title={i18n.t('company')}
                name="briefcase"
                info={info.company.name}
              />
            </InforWrapper>

            <InforWrapper noPaddingLeft={1}>
              <Localization />
            </InforWrapper>

            <InforWrapper>
              <AmazingText
                content={i18n.t('actionLogout')}
                onPress={this.handleLogout}
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
  photo: state.user.photo,
  error: state.user.error,
});
const mapDispatchToProps = {
  logout,
  changeLocalization,
  uploadImage,
  updateProfile,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
