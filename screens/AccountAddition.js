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
import { logout, addAccount } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class AccountAddition extends React.Component {
  state = {
    name: '',
    description: '',
    isVisible: false,
    isLoading: false,
  };

  handleAddAccount = () => {
    const { name, description } = this.state;
    this.setState({ isLoading: true });
    this.props.addAccount(
      { name, description },
      {
        success: () => {
          this.props.navigation.navigate('Account');
          this.setState({ isLoading: false });
        },
        failure: () => {
          this.setState({
            isVisible: true,
            isLoading: false,
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
    const { navigation } = this.props;
    const { name, description, isVisible, isLoading } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('accountAddition')}</Typography>
            <Text />
          </Header>
        </HeaderWrapper>

        <ScrollView>
          <InterestTextInput
            label={i18n.t('name')}
            value={name}
            onChangeText={name => this.setState({ name })}
          />
          <InterestTextInput
            label={i18n.t('description')}
            value={description}
            multiline
            onChangeText={description => this.setState({ description })}
          />
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleAddAccount}
              loading={isLoading}
            >
              <Text>{i18n.t('actionSave')}</Text>
            </Button>
          </FewStyledContainer>
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
  error: state.account.error,
});
const mapDispatchToProps = {
  logout,
  addAccount,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountAddition)
);
