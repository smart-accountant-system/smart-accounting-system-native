/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { logout, getCustomers, addCustomerToReceipt } from '../redux/actions';
import { ItemWithoutRemove } from '../containers/CustomerManagement';
import { FeatherIcon, Loading, Empty } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class CustomerInReceipt extends React.Component {
  state = {
    refreshing: false,
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
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

  handleAddCustomer = customer => {
    const { navigation } = this.props;
    this.props.addCustomerToReceipt(customer);
    navigation.navigate('ReceiptAddition');
  };

  render() {
    const { navigation, customers } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>

            <Typography>{i18n.t('customerManagement')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="plus" />
          </Header>
        </HeaderWrapper>
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
                <ItemWithoutRemove
                  key={customer._id}
                  onPress={() => this.handleAddCustomer(customer)}
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
  addCustomerToReceipt,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerInReceipt)
);
