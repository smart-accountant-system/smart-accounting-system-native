/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { getAccountById } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { AccountContent } from '../containers/Account';
import { TAccount } from '../containers/AccountDetail';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class AccountDetail extends React.Component {
  state = {
    refreshing: false,
  };

  _onRefresh = () => {
    const { currentAccount } = this.props;
    this.setState({ refreshing: true });
    this.props.getAccountById(currentAccount._id, {
      success: () => {
        this.setState({ refreshing: false });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  render() {
    const { navigation, currentAccount } = this.props;
    const { refreshing } = this.state;
    const color =
      currentAccount.debit > currentAccount.credit ? '#438763' : '#ad6b8d';
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
        >
          <AccountContent
            noBorder
            name={currentAccount.name}
            description={currentAccount.description}
            color={
              currentAccount.debit > currentAccount.credit
                ? '#438763'
                : '#ad6b8d'
            }
            balance={Math.abs(currentAccount.debit - currentAccount.credit)}
            balanceType={
              currentAccount.debit > currentAccount.credit
                ? 'Debit balance'
                : 'Credit balance'
            }
            time={new Date(currentAccount.createdAt).toLocaleDateString(
              i18n.t('local'),
              {
                day: 'numeric',
                month: 'long',
              }
            )}
          />
          <TAccount currentAccount={currentAccount} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentAccount: state.account.currentAccount,
});
const mapDispatchToProps = {
  getAccountById,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountDetail)
);
