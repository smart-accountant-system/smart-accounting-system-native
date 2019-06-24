/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { handle401 } from '../constants/strategies';
import { AmazingText } from '../containers/InvoiceAddition';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { getInvoiceById, getPayments } from '../redux/actions';
import InvoiceDetailSection, {
  PaymentSection,
} from '../containers/InvoiceDetail';

class InvoiceDetail extends React.Component {
  state = {
    refreshing: false,
  };

  _onRefresh = () => {
    const { currentInvoice } = this.props;
    this.setState({ refreshing: true });
    this.props.getInvoiceById(currentInvoice._id, {
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
    const {
      navigation,
      currentInvoice,
      payments,
      user: { info },
    } = this.props;

    const { refreshing } = this.state;

    const paymentsOfInvoice = payments.payments.filter(
      payment => payment.invoice === currentInvoice._id
    );

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceDetail')}</Typography>
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
          <InvoiceDetailSection currentInvoice={currentInvoice} />
          <PaymentSection payments={paymentsOfInvoice} />

          {info.role === ROLE.STAFF ? (
            <AmazingText
              content={i18n.t('accountAddPayment')}
              onPress={() => {
                navigation.navigate('PaymentAddition', {
                  _id: currentInvoice._id,
                });
              }}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentInvoice: state.invoice.currentInvoice,
  payments: state.payment.payments,
});
const mapDispatchToProps = {
  getInvoiceById,
  getPayments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
