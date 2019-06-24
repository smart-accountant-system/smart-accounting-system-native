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
import {
  HeaderInvoice,
  DescriptionHeader,
  DetailItem,
  FooterInvoice,
} from '../containers/InvoiceDetail';

class InvoiceDetail extends React.Component {
  state = {
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getPayments(
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
    const name = currentInvoice.type === 0 ? 'Purchase' : 'Sale';
    const color = currentInvoice.status ? '#438763' : '#ad6b8d';
    const status = currentInvoice.status ? 'Paid' : 'Unpaid';
    const {
      createdBy: { fullname, username },
      createdAt,
      totalCost,
    } = currentInvoice;

    console.log(payments);

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
          <HeaderInvoice
            name={name}
            employeeUsername={username}
            employeeName={fullname}
            color={color}
            status={status}
            createdAt={new Date(createdAt).toLocaleDateString(i18n.t('local'), {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          <DescriptionHeader
            product={i18n.t('product')}
            quantity={i18n.t('quantity')}
            unitPrice={i18n.t('unitPrice')}
            cost={i18n.t('cost')}
          />
          {currentInvoice.detail.map(({ product, quantity, unitPrice }) => (
            <DetailItem
              key={Math.random()}
              product={product}
              quantity={quantity}
              unitPrice={unitPrice}
            />
          ))}
          <FooterInvoice color={color} totalCost={totalCost} />
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
