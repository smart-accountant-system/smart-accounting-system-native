/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { Radio, RadioGroup } from '../containers/EmployeeAddition';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, addEmployee, getEmployees } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class PaymentMethodAddition extends React.Component {
  state = {
    username: 'staff_sample',
    password: '123456',
    repassword: '123456',
    fullname: 'staff',
    role: 1,
    email: 'staff_sample@gmail.com',
    phone: '0123456789',
    isVisible: false,
    isTypo: false,
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

    if (repassword !== password) {
      this.setState({ isVisible: true, isTypo: true });
      return;
    }

    this.props.addEmployee(
      { username, password, fullname, role, email, phone },
      {
        success: () => {
          this.props.navigation.navigate('EmployeeManagement');
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
    const { navigation, isLoading, error } = this.props;
    const {
      username,
      password,
      repassword,
      fullname,
      role,
      email,
      phone,
      isVisible,
      isTypo,
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
            <Text />
          </Header>
        </HeaderWrapper>

        <ScrollView>
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
            label={i18n.t('email')}
            value={email}
            onChangeText={email => this.setState({ email })}
          />
          <InterestTextInput
            label={i18n.t('phone')}
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />

          <RadioGroup>
            <Radio
              label={i18n.t('staff')}
              selected={role === 1}
              onPress={() => this.setState({ role: 1 })}
            />
            <Radio
              label={i18n.t('accountant')}
              selected={role === 2}
              onPress={() => this.setState({ role: 2 })}
            />
            <Radio
              label={i18n.t('manager')}
              selected={role === 3}
              onPress={() => this.setState({ role: 3 })}
            />
          </RadioGroup>
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
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false, isTypo: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {isTypo ? i18n.t('messageWP') : i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.employee.isLoading,
  error: state.employee.error,
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
