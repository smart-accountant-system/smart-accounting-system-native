/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, HelperText, Button } from 'react-native-paper';
import i18n from 'i18n-js';
import { LocalAuthentication } from 'expo';

import {
  LoginContainer,
  LoginBackground,
  FooContainer,
  TextInputWrapper,
  AmazingCircle,
  LoginFooter,
  FingerprintWrapper,
  FingerprintTextWrapper,
  FingerprintText,
} from '../containers/Login';
import ROLE from '../constants/role';
import { login } from '../redux/actions';
import Layout from '../constants/Layout';
import MaterialCommunityIcon from '../components/MaterialCommunityIcon';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    visible: false,
    loading: false,
    compatible: false,
    fingerprints: false,
  };

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    const fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    const result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    console.log('Scan Result:', result);
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    this.props.login(
      { username, password },
      {
        success: () => {
          // this.setState({ loading: false });
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
          this.setState({ visible: true, loading: false });
        },
      }
    );
  };

  handleForgetPassword = () => {};

  handleSignup = () => {};

  render() {
    const {
      username,
      password,
      visible,
      loading,
      fingerprints,
      compatible,
    } = this.state;
    const { theme, user } = this.props;
    console.log(fingerprints, compatible);

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

            <View style={{ backgroundColor: 'white', height: '65%' }}>
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
                  loading={loading}
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
                <TouchableOpacity onPress={this.scanFingerprint}>
                  <FingerprintWrapper>
                    <MaterialCommunityIcon color="#555" name="fingerprint" />
                    <FingerprintTextWrapper>
                      <FingerprintText>Mở khoá bằng vân tay</FingerprintText>
                    </FingerprintTextWrapper>
                  </FingerprintWrapper>
                </TouchableOpacity>
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
