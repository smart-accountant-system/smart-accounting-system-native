/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { getReceiptById } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { ReceiptHeader, ReceiptDetailBody } from '../containers/ReceiptDetail';

class ReceiptDetail extends React.Component {
  state = {
    refreshing: false,
  };

  _onRefresh = () => {
    const { currentReceipt } = this.props;
    this.setState({ refreshing: true });
    this.props.getReceiptById(currentReceipt._id, {
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
    const { navigation, currentReceipt } = this.props;
    const { refreshing } = this.state;
    const type =
      currentReceipt.payment.type === 0
        ? i18n.t('receiptVoucher')
        : i18n.t('paymentVoucher');
    const status = currentReceipt.status
      ? i18n.t('receiptRecoredAsTransaction')
      : i18n.t('receiptNotRecoredAsTransaction');
    const color = currentReceipt.status ? '#438763' : '#ad6b8d';
    const customer = currentReceipt.customer.name;
    // const payment = receipt.payment.category.name;
    // const cost = receipt.payment.amountMoney;
    // const description = receipt.payment.description;
    const {
      description,
      amountMoney: cost,
      category: { name: payment },
    } = currentReceipt.payment;
    const { createdAt } = currentReceipt;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Receipt')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('receiptDetail')}</Typography>
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
          <ReceiptHeader
            type={type}
            createdAt={createdAt}
            color={color}
            status={status}
          />
          <ReceiptDetailBody
            customer={customer}
            cost={cost}
            payment={payment}
            description={description}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentReceipt: state.receipt.currentReceipt,
});
const mapDispatchToProps = {
  getReceiptById,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReceiptDetail)
);
