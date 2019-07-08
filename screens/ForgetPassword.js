/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { sendResetPassword } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import { AmazingText } from '../containers/InvoiceAddition';

class EmployeeAddition extends React.Component {
  state = {
    username: '',
    isLoading: false,
    isVisible: false,
  };

  handleGetPasswordBack = () => {
    const { username } = this.state;
    this.setState({ isLoading: true });
    this.props.sendResetPassword(username, {
      success: () => {
        this.setState({ isLoading: false });
      },
      failure: () => {
        this.setState({ isVisible: true, isLoading: false });
      },
    });
  };

  render() {
    const { navigation } = this.props;
    const { username, isLoading, isVisible } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('messageForgetPassword')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

        <ScrollView>
          <AmazingText content={i18n.t('messageGetPasswordBack')} />
          <InterestTextInput
            label={i18n.t('username')}
            value={username}
            onChangeText={username => this.setState({ username })}
          />
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleGetPasswordBack}
              loading={isLoading}
            >
              <Text>{i18n.t('actionGetPasswordBack')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageSendRSPWFailure')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.employee.error,
});
const mapDispatchToProps = {
  sendResetPassword,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeAddition)
);
