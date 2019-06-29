/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { Radio, RadioGroup } from '../containers/EmployeeAddition';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, addEmployee, updateEmployee } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class EmployeeAddition extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { _id, username, fullname, role, email, phone } = navigation.getParam(
      'employee',
      ''
    );
    this._id = _id;
    this.state = {
      username: username || '',
      password: '',
      repassword: '',
      fullname: fullname || '',
      role: role || 1,
      email: email || '',
      phone: phone || '',
      isVisible: false,
      isTypo: false,
      isLoading: false,
    };
  }

  handleAddEmployee = () => {
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

    this.setState({ isLoading: true });
    this.props.addEmployee(
      { username, password, fullname, role, email, phone },
      {
        success: () => this.props.navigation.goBack(),
        failure: () =>
          this.setState({
            isVisible: true,
            isLoading: false,
          }),
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleUpdate = () => {
    const { username, fullname, role, email, phone } = this.state;

    this.setState({ isLoading: true });
    this.props.updateEmployee(
      this._id,
      { username, fullname, role, email, phone },
      {
        success: () => this.props.navigation.goBack(),
        failure: () =>
          this.setState({
            isVisible: true,
            isLoading: false,
          }),
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
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
      role,
      email,
      phone,
      isVisible,
      isTypo,
      isLoading,
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
            <Typography>
              {this._id ? i18n.t('employeeUpdate') : i18n.t('employeeAddition')}
            </Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

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
              onPress={this._id ? this.handleUpdate : this.handleAddEmployee}
              loading={isLoading}
            >
              <Text>
                {this._id ? i18n.t('actionUpdate') : i18n.t('actionSave')}
              </Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false, isTypo: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {this._id
            ? i18n.t('messageUpdateFail')
            : isTypo
            ? i18n.t('messageWP')
            : i18n.t('messageAddFail')}
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
  updateEmployee,
  addEmployee,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeAddition)
);
