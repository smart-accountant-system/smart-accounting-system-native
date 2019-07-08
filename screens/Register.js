/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, register } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import Layout from '../constants/Layout';

class EmployeeAddition extends React.Component {
  state = {
    username: 'tholxag123vn2010',
    password: '123456',
    repassword: '123456',
    fullname: 'Duke Thor',
    // role: 3,
    email: 'tholxag123vn2010@gmail.com',
    phone: '0947857301',
    company: 'ABC',
    isLoading: false,
    isVisible: false,
    isTypo: false,
  };

  handleSignup = () => {
    const { navigation } = this.props;
    const {
      username,
      password,
      repassword,
      fullname,
      email,
      phone,
      company,
    } = this.state;

    if (repassword !== password) {
      this.setState({ isVisible: true, isTypo: true });
      return;
    }

    this.setState({ isLoading: true });
    // call api sign up
    this.props.register(
      {
        company: {
          name: company,
          email,
        },
        employee: {
          username,
          password,
          fullname,
          email,
          phone,
        },
      },
      {
        success: () => {
          this.setState({ isLoading: false });
          navigation.navigate('Login');
        },
        failure: () => {
          this.setState({ isVisible: true, isLoading: false });
        },
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const {
      username,
      password,
      repassword,
      fullname,
      company,
      email,
      phone,
      isLoading,
      isVisible,
      isTypo,
    } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('signup')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            width: Layout.deviceWidth,
            height: Layout.deviceHeight,
          }}
        >
          <ScrollView>
            <InterestTextInput
              label={i18n.t('username')}
              value={username}
              onChangeText={username => this.setState({ username })}
            />
            {!this._id && (
              <Fragment>
                <InterestTextInput
                  label={i18n.t('password')}
                  value={password}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                />
                <InterestTextInput
                  label={i18n.t('repassword')}
                  value={repassword}
                  secureTextEntry
                  onChangeText={repassword => this.setState({ repassword })}
                />
              </Fragment>
            )}
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
            <InterestTextInput
              label={i18n.t('company')}
              value={company}
              onChangeText={company => this.setState({ company })}
            />

            <FewStyledContainer paddingTop>
              <Button
                mode="contained"
                style={{ width: 170 }}
                contentStyle={{ height: 50 }}
                onPress={this.handleSignup}
                loading={isLoading}
              >
                <Text>{i18n.t('signup')}</Text>
              </Button>
            </FewStyledContainer>
          </ScrollView>
        </KeyboardAvoidingView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false, isTypo: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {isTypo ? i18n.t('messageWP') : 'Đăng ký không thành công'}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error,
  registerUsername: state.user.registerUsername,
  registerPassword: state.user.registerPassword,
});
const mapDispatchToProps = {
  logout,
  register,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeAddition)
);
