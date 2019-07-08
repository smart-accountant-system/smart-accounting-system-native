/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { resetPassword } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class PasswordChange extends React.Component {
  state = {
    password: '',
    repassword: '',
    isLoading: false,
    isVisible: false,
  };

  handleGetPasswordBack = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token', '');
    const { password, repassword } = this.state;
    if (password === repassword) {
      this.setState({ isLoading: true });
      this.props.resetPassword({ password }, token, {
        success: () => {
          this.setState({ isLoading: false });
          navigation.navigate('Login');
        },
        failure: () => {
          this.setState({ isLoading: false, isVisible: true });
        },
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const { password, repassword, isLoading, isVisible } = this.state;

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
          <InterestTextInput
            label={i18n.t('password')}
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          <InterestTextInput
            label={i18n.t('repassword')}
            value={repassword}
            onChangeText={repassword => this.setState({ repassword })}
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
          {i18n.t('messageRSPWFailure')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.employee.error,
});
const mapDispatchToProps = {
  resetPassword,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordChange)
);
