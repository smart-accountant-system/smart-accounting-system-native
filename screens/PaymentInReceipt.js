/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { FeatherIcon, Loading, Empty } from '../components';
import { handle401 } from '../constants/strategies';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { logout, getPayments, addPaymentToReceipt } from '../redux/actions';
import { PaymentSectionInReceipt } from '../containers/Receipt';

class PaymentInReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    this.props.getPayments(
      {},
      {
        success: () => {
          this.setState({ refreshing: false });
        },
        false: () => {
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

  render() {
    const { navigation, payments } = this.props;
    const { refreshing, loading } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReceiptAddition')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('payment')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="plus" />
          </Header>
        </HeaderWrapper>

        {payments && !loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!payments.payments.length ? (
              <Empty name={i18n.t('payment')} />
            ) : (
              <PaymentSectionInReceipt
                {...this.props}
                payments={payments.payments}
              />
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
  payments: state.payment.payments,
});
const mapDispatchToProps = {
  logout,
  getPayments,
  addPaymentToReceipt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInReceipt);
