/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, addEmployee, getEmployees } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class PaymentMethodAddition extends React.Component {
  state = {
    username: '2122',
    password: '',
    repassword: '',
    fullname: '',
    role: '',
    email: '',
    phone: '',
    isVisible: false,
  };

  handleAddPaymentMethod = () => {
    const {
      username,
      password,
      repassword,
      fullname,
      role,
      email,
      phone,
    } = this.state;
    this.props.addEmployee(
      { username, password, repassword, fullname, role, email, phone },
      {
        success: () => {
          this.props.navigation.navigate('PaymentMethod');
          this.props.getEmployees(
            {},
            {
              handle401: () =>
                handle401({
                  logout: this.props.logout,
                  navigation: this.props.navigation,
                }),
            }
          );
        },
        failure: () => {
          this.setState({
            isVisible: true,
          });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  render() {
    const { navigation, isLoading } = this.props;
    const {
      username,
      password,
      repassword,
      fullname,
      role,
      email,
      phone,
      isVisible,
    } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeManagement')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('employeeAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <View>
            <InterestTextInput
              label={i18n.t('username')}
              value={username}
              onChangeText={username => this.setState({ username })}
            />

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
            <InterestTextInput
              label={i18n.t('fullname')}
              value={fullname}
              onChangeText={fullname => this.setState({ fullname })}
            />
            <InterestTextInput
              label={i18n.t('role')}
              value={role}
              onChangeText={role => this.setState({ role })}
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
                onPress={this.handleAddPaymentMethod}
                loading={isLoading}
              >
                <Text>{i18n.t('actionSave')}</Text>
              </Button>
            </FewStyledContainer>
          </View>
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.employee.isLoading,
});
const mapDispatchToProps = {
  logout,
  addEmployee,
  getEmployees,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentMethodAddition)
);
