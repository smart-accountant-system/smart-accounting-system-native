/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, updateProfile } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const info = navigation.getParam('info', '');
    this.state = {
      _id: info._id || '',
      username: info.username || '',
      fullname: info.fullname || '',
      email: info.email || '',
      phone: info.phone || '',
      isLoading: false,
      isVisible: false,
    };
  }

  handleUpdate = () => {
    const { navigation } = this.props;
    const { _id, username, fullname, email, phone } = this.state;
    this.setState({ isLoading: true });
    this.props.updateProfile(
      _id,
      {
        username,
        fullname,
        email,
        phone,
      },
      {
        success: () => {
          this.setState({ isLoading: false });
          navigation.goBack();
        },
        failure: () => {},
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const { fullname, email, phone, isLoading, isVisible } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('editProfile')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

        <ScrollView>
          <InterestTextInput
            label={i18n.t('fullname')}
            value={fullname}
            onChangeText={fullname => this.setState({ fullname })}
          />
          <InterestTextInput
            label={i18n.t('email')}
            value={email}
            onChangeText={email => this.setState({ email })}
          />
          <InterestTextInput
            label={i18n.t('phone')}
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleUpdate}
              loading={isLoading}
            >
              <Text>{i18n.t('actionUpdate')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageUpdateFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.employee.error,
});
const mapDispatchToProps = {
  logout,
  updateProfile,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)
);
