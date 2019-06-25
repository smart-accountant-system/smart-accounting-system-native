/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
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
import { getInvoiceById, getPayments, chooseInvoice } from '../redux/actions';
import InvoiceDetailSection from '../containers/InvoiceDetail';

class InvoiceDetail extends React.Component {
  state = {
    refreshing: false,
  };

  componentDidMount = () => {
    const {
      currentInvoice: { _id },
    } = this.props;
    this.props.getPayments(
      _id,
      {},
      {
        success: () => {
          const {
            invoices: { invoices },
          } = this.props;
          let invoice;

          invoices.map(item => {
            if (item._id == _id) {
              invoice = item;
            }
          });
          this.props.chooseInvoice(invoice);
          console.log(invoice);
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
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
      currentInvoice: { payments },
      user: { info },
    } = this.props;

    const { refreshing } = this.state;
    console.log(currentInvoice);

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

          {info.role === ROLE.STAFF ? (
            <AmazingText
              content={i18n.t('accountAddPayment')}
              onPress={() => {
                navigation.navigate('PaymentAddition', {
                  _id: currentInvoice._id,
                  previous: 'InvoiceDetail',
                });
              }}
            />
          ) : null}
          {payments && (
            <AmazingText
              content="Show recorded payments"
              onPress={() => {
                navigation.navigate('Payment', {
                  _id: currentInvoice._id,
                });
              }}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentInvoice: state.invoice.currentInvoice,
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  chooseInvoice,
  getInvoiceById,
  getPayments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
