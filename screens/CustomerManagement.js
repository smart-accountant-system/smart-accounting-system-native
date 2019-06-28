/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { logout, getCustomers, removeCustomer } from '../redux/actions';
import { CustomerItem } from '../containers/CustomerManagement';
import { FeatherIcon, Loading, Searchbar, Empty } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class CustomerManagement extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
    visibleSnackbar: false,
  };

  componentDidMount = () => {
    this.props.getCustomers(
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
    this.props.getCustomers(
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
        this.props.getCustomers(
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
    this.props.removeCustomer(_id, {
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
    const { navigation, customers, info } = this.props;
    const { searchText, refreshing, visibleSnackbar } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            {info.role === ROLE.STAFF ? (
              <FeatherIcon color={theme.colors.primary} name="chevron-left" />
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FeatherIcon color={theme.colors.white} name="chevron-left" />
              </TouchableOpacity>
            )}

            <Typography>{i18n.t('customerManagement')}</Typography>
            {info.role === ROLE.ACCOUNTANT ? (
              <FeatherIcon color={theme.colors.primary} name="chevron-left" />
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomerAddition')}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            )}
          </Header>
        </HeaderWrapper>
        <Searchbar value={searchText} onChangeText={this.handleSearch} />

        {customers ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!customers.customers.length ? (
              <Empty name={i18n.t('customer')} />
            ) : (
              customers.customers.map(customer => (
                <CustomerItem
                  disabled={info.role === ROLE.ACCOUNTANT}
                  onRemove={() => this.handleRemove(customer._id)}
                  key={customer._id}
                  name={customer.name}
                  phone={customer.phone}
                  address={customer.address}
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
  info: state.user.info,
  customers: state.customer.customers,
});
const mapDispatchToProps = {
  logout,
  getCustomers,
  removeCustomer,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerManagement)
);
