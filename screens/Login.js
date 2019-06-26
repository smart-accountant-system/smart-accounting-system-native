/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, HelperText, Button } from 'react-native-paper';
import i18n from 'i18n-js';

import {
  LoginContainer,
  LoginBackground,
  FooContainer,
  TextInputWrapper,
  AmazingCircle,
  LoginFooter,
  SocialButton,
} from '../containers/Login';
import ROLE from '../constants/role';
import { login } from '../redux/actions';
import Layout from '../constants/Layout';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    visible: false,
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { navigation } = this.props;

    this.props.login(
      { username, password },
      {
        success: () => {
          const {
            user: { info },
          } = this.props;
          navigation.navigate(
            !info
              ? 'Login'
              : info.role === ROLE.MANAGER || info.role === ROLE.ACCOUNTANT
              ? 'TabNavigator'
              : 'StaffNavigator'
          );
        },
        failure: () => {
          this.setState({ visible: true });
        },
      }
    );
  };

  handleForgetPassword = () => {};

  handleSignup = () => {};

  render() {
    const { username, password, visible } = this.state;
    const { theme, user } = this.props;
    console.log(user);
    return (
      <LoginBackground>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            keyboardVerticalOffset={0}
            style={{
              flex: 1,
              width: Layout.deviceWidth,
              height: Layout.deviceHeight,
            }}
          >
            <LoginContainer>
              <FooContainer />
              <AmazingCircle backgroundColor={theme.colors.primary}>
                <Text
                  style={{
                    color: theme.colors.white,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}
                >
                  SAS
                </Text>
              </AmazingCircle>
            </LoginContainer>

            <View style={{ backgroundColor: 'white', height: '60%' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 40,
                }}
              >
                <TextInputWrapper
                  label={i18n.t('username')}
                  autoCompleteType="username"
                  autoCapitalize="none"
                  value={username}
                  style={{ width: '100%' }}
                  onChangeText={text => this.setState({ username: text })}
                />
                <TextInputWrapper
                  label={i18n.t('password')}
                  autoCompleteType="password"
                  autoCapitalize="none"
                  value={password}
                  secureTextEntry
                  onChangeText={text => this.setState({ password: text })}
                />

                <HelperText type="error" visible={visible}>
                  Tên đăng nhập hoặc mật khẩu không hợp lệ
                </HelperText>

                <Button
                  mode="contained"
                  style={{ width: Layout.deviceWidth - 50, marginTop: 10 }}
                  contentStyle={{ height: 50 }}
                  onPress={this.handleLogin}
                  loading={user.isLogging}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: theme.colors.white,
                    }}
                  >
                    {i18n.t('login')}
                  </Text>
                </Button>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 140,
                  }}
                >
                  <SocialButton name="facebook" background="#4968AD" />
                  <SocialButton name="google" background="#C65447" />
                </View>
              </View>

              <LoginFooter
                handleForgetPassword={this.handleForgetPassword}
                handleSignup={this.handleSignup}
                color={theme.colors.primary}
              />
            </View>

            <View style={{ backgroundColor: 'white', height: '100%' }} />
          </KeyboardAvoidingView>
        </ScrollView>
      </LoginBackground>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = {
  login,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
