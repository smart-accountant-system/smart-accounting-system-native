/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withTheme, Snackbar, Button } from 'react-native-paper';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { login } from '../actions';
import Layout from '../constants/Layout';
import {
  LoginScreenWrapper,
  FooContainer,
  TextInputWrapper,
  AmazingCircle,
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
          <LoginScreenWrapper>
            <FooContainer />
            <AmazingCircle backgroundColor={theme.colors.primary}>
              <Text
                style={{
                  color: theme.colors.whiteText,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                SAS
              </Text>
            </AmazingCircle>
          </LoginScreenWrapper>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 40,
            }}
          >
            <TextInputWrapper
              name="username"
              placeholder="Username"
              value={username}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
            />
            <TextInputWrapper
              placeholder="Password"
              value={password}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />
            <Text />

            <Button
              mode="contained"
              style={{ width: Layout.deviceWidth - 50 }}
              onPress={this.handleLogin}
              loading={info.isLogging}
            >
              Login
            </Button>
          </View>

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
