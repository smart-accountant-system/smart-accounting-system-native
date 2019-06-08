/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Searchbar } from 'react-native-paper';
import i18n from 'i18n-js';
import { getAccounts } from '../redux/actions';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import Loading from '../components/Loading';
import { AccountItem, AccountContent } from '../containers/Account';

class Account extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getAccounts({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getAccounts({
      success: () => {
        this.setState({ refreshing: false });
      },
      failure: () => {},
    });
  };

  accountDetail = account => {
    const { navigation } = this.props;
    navigation.navigate('AccountDetail', { account });
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getAccounts({
          params: {
            search: query,
          },
          success: () => {},
          failure: () => {},
        });
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
        <Searchbar
          value={searchText}
          placeholder="Search"
          onChangeText={this.handleSearch}
          style={{
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
          }}
        />

        {accounts ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {accounts.accounts.map(account => (
              <AccountItem
                key={account._id}
                account={account}
                accountDetail={this.accountDetail}
              >
                <AccountContent
                  name={account.name}
                  description={account.description}
                  color={account.debit > account.credit ? '#438763' : '#ad6b8d'}
                  balance={Math.abs(account.debit - account.credit)}
                  balanceType={
                    account.debit > account.credit
                      ? 'Debit balance'
                      : 'Credit balance'
                  }
                  time={new Date(account.createdAt).toLocaleDateString(
                    'vi-VN',
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )}
                />
              </AccountItem>
            ))}
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
  getAccounts,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
