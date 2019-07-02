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
import { logout, addEmployee } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import Layout from '../constants/Layout';

class EmployeeAddition extends React.Component {
  state = {
    username: '',
    password: '',
    repassword: '',
    fullname: '',
    role: 3,
    email: '',
    phone: '',
    company: '',
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
      role,
      email,
      phone,
      company,
    } = this.state;

    if (repassword !== password) {
      this.setState({ isVisible: true, isTypo: true });
      return;
    }

    this.setState({ isLoading: true });
    this.props.addEmployee(
      { username, password, fullname, role, email, phone, company },
      {
        success: () => {
          this.props.login(
            { username, password },
            {
              success: () => {
                this.setState({ isLoading: false });
                navigation.navigate('TabNavigator');
              },
              failure: () => {
                this.setState({ isVisible: true, isLoading: false });
              },
            }
          );
        },
        failure: () =>
          this.setState({
            isVisible: true,
            isLoading: false,
          }),
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
          behavior="height"
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
          {i18n.t('messageWP')}
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
  addEmployee,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeAddition)
);
