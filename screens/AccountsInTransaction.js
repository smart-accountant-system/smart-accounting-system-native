/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import {
  logout,
  addDebitAccountToTransaction,
  addCreditAccountToTransaction,
} from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Searchbar, Empty } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { AccountInTransaction } from '../containers/Transaction';

class AccountsInTransaction extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
    visibleSnackbar: false,
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

  handleAddAccountToTransaction = account => {
    const { navigation } = this.props;
    const type = navigation.getParam('type', '');
    if (type === 'debit') {
      this.addDebitAccountToTransaction(account);
    } else {
      this.addCreditAccountToTransaction(account);
    }
  };

  render() {
    const {
      accounts,
      navigation,
      user: { info },
    } = this.props;
    const { searchText, refreshing, visibleSnackbar } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionAddition')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="plus" />
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
                // <AccountItem
                //   disabled
                //   editable
                //   key={account._id}
                //   account={account}
                // >
                //   <AccountContent
                //     name={account.name}
                //     description={account.description}
                //     color={
                //       account.debit > account.credit ? '#438763' : '#ad6b8d'
                //     }
                //     balance={Math.abs(account.debit - account.credit)}
                //     balanceType={
                //       account.debit > account.credit
                //         ? 'Debit balance'
                //         : 'Credit balance'
                //     }
                //     time={new Date(account.createdAt).toLocaleDateString(
                //       i18n.t('local'),
                //       {
                //         day: 'numeric',
                //         month: 'long',
                //       }
                //     )}
                //   />
                // </AccountItem>
                <AccountInTransaction
                  onPress={() => this.handleAddAccountToTransaction(account)}
                  account={account}
                  key={account._id}
                />
              ))
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => this.setState({ visibleSnackbar: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageDeleteFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  accounts: state.account.accounts,
});
const mapDispatchToProps = {
  logout,
  addDebitAccountToTransaction,
  addCreditAccountToTransaction,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountsInTransaction)
);
