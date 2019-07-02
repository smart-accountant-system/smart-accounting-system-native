/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';
import {
  View,
  ScrollView,
  RefreshControl,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import {
  logout,
  getAccounts,
  chooseAccount,
  removeAccount,
} from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Searchbar, Empty } from '../components';
import { AccountItem, AccountContent } from '../containers/Account';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class Account extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
    visibleSnackbar: false,
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

  handleRemove = _id => {
    this.props.removeAccount(_id, {
      success: () => {
        LayoutAnimation.spring();
      },
      failure: () => {
        this.setState({ visibleSnackbar: true });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
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
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
            <Typography>{i18n.t('account')}</Typography>
            {info.role === ROLE.ACCOUNTANT ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountAddition')}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            ) : (
              <FeatherIcon color={theme.colors.primary} name="plus" />
            )}
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
                  disabled={info.role !== ROLE.ACCOUNTANT}
                  editable
                  onRemove={() => this.handleRemove(account._id)}
                  onEdit={() =>
                    navigation.navigate('AccountAddition', { account })
                  }
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
  getAccounts,
  chooseAccount,
  removeAccount,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
