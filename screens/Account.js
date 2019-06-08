/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Searchbar } from 'react-native-paper';
import i18n from 'i18n-js';

import { getAccounts } from '../redux/actions';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import Loading from '../components/Loading';

class Account extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
  };

  componentDidMount = () => {
    this.props.getAccounts({
      success: () => {},
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
      }, 1000),
    });
  };

  render() {
    const { accounts } = this.props;
    const { searchText } = this.state;
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
        />

        {accounts ? (
          <ScrollView>
            {accounts.accounts.map(account => (
              <TouchableOpacity
                onPress={() => this.accountDetail(account)}
                key={account._id}
                style={{
                  width: '100%',
                  height: 30,
                  borderBottomColor: '#444',
                  borderBottomWidth: 1,
                }}
              >
                <Text>{JSON.stringify(account.name)}</Text>
              </TouchableOpacity>
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
