import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { withTheme, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { LinearGradient, Video } from 'expo';

import background from '../assets/background.jpg';
import Layout from '../constants/Layout';
import { login } from '../actions';

const LoginScreenWrapper = styled.ImageBackground`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  resize-mode: cover;
`;

const TextInputWrapper = styled.TextInput`
  width: ${props => props.width || Layout.deviceWidth - 50};
  color: ${props => props.color || '#000'};
  background-color: ${props => props.color || '#fff'};
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
  margin: 10px;
`;

const LoginButtonWrapper = styled.TouchableHighlight`
  width: ${props => props.width || Layout.deviceWidth - 200};
  background-color: ${props => props.backgroundColor || '#fff'};
  justify-content: center;
  align-items: center;
  margin: 15px;
  height: 50px;
  border-radius: 20px;
  padding: 10px;
  opacity: ${props => (props.isLogging ? 0.6 : 1)};
  /* box-shadow: 5px 5px 5px ${props => props.color || '#000'}; */
`;

const HeaderTextWrapper = styled.Text`
  color: ${props => props.color || '#fff'};
  font-size: 40px;
`;

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    visible: false,
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { info, navigation } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.login(
      {
        username,
        password,
      },
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

  render() {
    const { username, password, visible } = this.state;
    const { theme, info } = this.props;
    return (
      <LoginScreenWrapper source={background}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              width: Layout.deviceWidth,
              height: Layout.deviceHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            keyboardVerticalOffset={0}
            enabled
          >
            <View
              style={{
                margin: 15,
              }}
            >
              <HeaderTextWrapper>Welcome</HeaderTextWrapper>
            </View>
            <TextInputWrapper
              placeholder="username"
              value={username}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
            />
            <TextInputWrapper
              placeholder="password"
              value={password}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />
            <LoginButtonWrapper
              backgroundColor={theme.colors.accent}
              underlayColor={theme.colors.accent}
              onPress={this.handleLogin}
              isLogging={info.isLogging}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {info.isLogging ? (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      opacity: 1,
                    }}
                    size="large"
                    color={theme.colors.text}
                  />
                ) : null}
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 20,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    textAlign: 'center',
                  }}
                >
                  Login
                </Text>
              </View>
            </LoginButtonWrapper>
          </KeyboardAvoidingView>
        </ScrollView>
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
      </LoginScreenWrapper>
    );
  }
}

const LoginWrapper = connect(
  state => ({
    info: state.user,
  }),
  {
    login,
  }
)(Login);

export default withTheme(LoginWrapper);
