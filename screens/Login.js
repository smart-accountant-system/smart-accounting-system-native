/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { withTheme, Snackbar, Button } from 'react-native-paper';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { login } from '../actions';
import Layout from '../constants/Layout';
import {
  LoginContainer,
  LoginBackground,
  FooContainer,
  TextInputWrapper,
  AmazingCircle,
  LoginFooter,
} from '../containers/Login';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    visible: false,
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { info, navigation } = this.props;

    this.props.login(
      { username, password },
      {
        success: () => {
          navigation.navigate('Home');
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
    const { theme, info } = this.props;
    return (
      <LoginBackground>
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
                    color: theme.colors.whiteText,
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
                  label="Username"
                  autoCompleteType="username"
                  value={username}
                  style={{ width: '100%' }}
                  onChangeText={username => this.setState({ username })}
                />
                <TextInputWrapper
                  label="Password"
                  autoCompleteType="password"
                  value={password}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                />

                <Button
                  mode="contained"
                  style={{ width: Layout.deviceWidth - 50, marginTop: 10 }}
                  contentStyle={{ height: 50 }}
                  onPress={this.handleLogin}
                  loading={info.isLogging}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    LOGIN
                  </Text>
                </Button>
              </View>

              <LoginFooter
                handleForgetPassword={this.handleForgetPassword}
                handleSignup={this.handleSignup}
                color={theme.colors.primary}
              />
            </View>

            <View style={{ backgroundColor: 'white', height: '100%' }} />

            <Snackbar
              visible={visible}
              onDismiss={() => this.setState({ visible: false })}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.whiteText,
              }}
            >
              Tên đăng nhập hoặc mật khẩu không hợp lệ
            </Snackbar>
          </KeyboardAvoidingView>
        </ScrollView>
      </LoginBackground>
    );
  }
}

const mapStateToProps = state => ({
  info: state.user,
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
