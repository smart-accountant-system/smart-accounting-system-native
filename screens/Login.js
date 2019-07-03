/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
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
import { LocalAuthentication, SecureStore, Linking } from 'expo';

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
  HelloText,
  LoginAnotherAccountWrapper,
} from '../containers/Login';
import ROLE from '../constants/role';
import { login } from '../redux/actions';
import Layout from '../constants/Layout';
import MaterialCommunityIcon from '../components/MaterialCommunityIcon';
import { AmazingText } from '../containers/InvoiceAddition';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    visible: false,
    loading: false,
    compatible: false,
    fingerprints: false,
    userInfo: null,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    const userInfo = await SecureStore.getItemAsync('userInfo');
    const userInfoObject = userInfo && JSON.parse(userInfo);
    if (userInfoObject) {
      this.setState({
        username: userInfoObject.username,
        userInfo: userInfoObject,
      });
    }
    Linking.addEventListener('url', url => {
      navigation.navigate('PasswordChange', { url });
    });
  };

  checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    const fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    const { navigation } = this.props;
    const { userInfo } = this.state;
    const { username, password } = userInfo;
    const result = await LocalAuthentication.authenticateAsync(
      i18n.t('actionScanFingerprint')
    );
    if (result.success) {
      this.setState({ loading: true });
      this.props.login(
        { username, password },
        {
          success: () => {
            this.setState({ loading: false });
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
    }
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
              ? 'LoginNavigator'
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

  handleForgetPassword = () => {
    const { navigation } = this.props;
    // dev
    navigation.navigate('ForgetPassword');
  };

  handleSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('Register');
  };

  handleLoginAnotherAccount = async () => {
    this.setState({ userInfo: null, username: '' });
    await SecureStore.setItemAsync('userInfo', '');
  };

  render() {
    const {
      username,
      password,
      visible,
      loading,
      fingerprints,
      compatible,
      userInfo,
    } = this.state;
    const { theme } = this.props;

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
                {userInfo ? (
                  <Fragment>
                    <HelloText content={i18n.t('messageWelcome')} />
                    <HelloText content={userInfo.fullname.toUpperCase()} />
                  </Fragment>
                ) : (
                  <TextInputWrapper
                    label={i18n.t('username')}
                    autoCompleteType="username"
                    autoCapitalize="none"
                    value={username}
                    style={{ width: '100%' }}
                    onChangeText={text => this.setState({ username: text })}
                  />
                )}
                <TextInputWrapper
                  label={i18n.t('password')}
                  autoCompleteType="password"
                  autoCapitalize="none"
                  value={password}
                  secureTextEntry
                  onChangeText={text => this.setState({ password: text })}
                />

                {visible && (
                  <HelperText type="error" visible>
                    {i18n.t('messageLoginFailed')}
                  </HelperText>
                )}

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
                {compatible && fingerprints && userInfo && (
                  <TouchableOpacity onPress={this.scanFingerprint}>
                    <FingerprintWrapper>
                      <MaterialCommunityIcon color="#555" name="fingerprint" />
                      <FingerprintTextWrapper>
                        <FingerprintText>
                          {i18n.t('actionUnlockWithFingerprint')}
                        </FingerprintText>
                      </FingerprintTextWrapper>
                    </FingerprintWrapper>
                  </TouchableOpacity>
                )}
                {userInfo && (
                  <LoginAnotherAccountWrapper>
                    <AmazingText
                      fontSize={14}
                      onPress={this.handleLoginAnotherAccount}
                      content={i18n.t('messageLoginWithAnotherAccount')}
                    />
                  </LoginAnotherAccountWrapper>
                )}
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
