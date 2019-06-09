/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { getCustomers } from '../redux/actions';

import theme from '../constants/theme';
import { CustomerItem } from '../containers/CustomerManagement';
import { FeatherIcon, Loading, Searchbar } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class CustomerManagement extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getCustomers({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getCustomers({
      success: () => {
        this.setState({ refreshing: false });
      },
      failure: () => {},
    });
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getCustomers({
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
    const { navigation, customers } = this.props;
    const { searchText, refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('customerManagement')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <Searchbar
          value={searchText}
          placeholder="Search"
          onChangeText={this.handleSearch}
        />

        {customers ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {customers.customers.map(customer => (
              <CustomerItem
                key={customer._id}
                name={customer.name}
                phone={customer.phone}
                address={customer.address}
              />
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
  customers: state.customer.customers,
});
const mapDispatchToProps = {
  getCustomers,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerManagement)
);
