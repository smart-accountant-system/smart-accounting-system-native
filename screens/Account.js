/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { View, ScrollView, RefreshControl } from 'react-native';

import theme from '../constants/theme';
import { logout, getAccounts, chooseAccount } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Searchbar, Empty } from '../components';
import { AccountItem, AccountContent } from '../containers/Account';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class Account extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getAccounts(
      {},
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getAccounts(
      {},
      {
        success: () => {
          this.setState({ refreshing: false });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  accountDetail = account => {
    const { navigation } = this.props;
    this.props.chooseAccount(account);
    navigation.navigate('AccountDetail');
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getAccounts(
          {
            search: query,
          },
          {
            handle401: () =>
              handle401({
                logout: this.props.logout,
                navigation: this.props.navigation,
              }),
          }
        );
      }, 300),
    });
  };

  render() {
    const { accounts } = this.props;
    const { searchText, refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <Searchbar value={searchText} onChangeText={this.handleSearch} />

        {accounts ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!accounts.accounts.length ? (
              <Empty name={i18n.t('account')} />
            ) : (
              accounts.accounts.map(account => (
                <AccountItem
                  key={account._id}
                  account={account}
                  accountDetail={this.accountDetail}
                >
                  <AccountContent
                    name={account.name}
                    description={account.description}
                    color={
                      account.debit > account.credit ? '#438763' : '#ad6b8d'
                    }
                    balance={Math.abs(account.debit - account.credit)}
                    balanceType={
                      account.debit > account.credit
                        ? 'Debit balance'
                        : 'Credit balance'
                    }
                    time={new Date(account.createdAt).toLocaleDateString(
                      i18n.t('local'),
                      {
                        day: 'numeric',
                        month: 'long',
                      }
                    )}
                  />
                </AccountItem>
              ))
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.account.accounts,
});
const mapDispatchToProps = {
  logout,
  getAccounts,
  chooseAccount,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
