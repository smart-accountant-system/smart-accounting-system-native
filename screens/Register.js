/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { Radio, RadioGroup } from '../containers/EmployeeAddition';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class EmployeeAddition extends React.Component {
  state = {
    username: '',
    password: '',
    repassword: '',
    fullname: '',
    role: 1,
    email: '',
    phone: '',
    isLoading: false,
  };

  handleSignup = () => {};

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
              onPress={this.handleSignup}
              loading={isLoading}
            >
              <Text>{i18n.t('signup')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.employee.error,
});
const mapDispatchToProps = {
  logout,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeAddition)
);
