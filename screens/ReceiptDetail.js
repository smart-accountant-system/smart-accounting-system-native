import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';

class ReceiptDetail extends React.Component {
  render() {
    const { navigation, currentReceipt } = this.props;
    const type =
      currentReceipt.payment.type === 0
        ? 'Receipt Voucher' // phieu thu
        : 'Payment Voucher'; // phieu chi
    const status = currentReceipt.status
      ? 'Recorded as a transaction'
      : 'Not record as a transaction yet';
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
            <Typography>{i18n.t('receipt')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <View
            style={{
              padding: 8,
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>{type}</Text>
            <Text style={{ color: '#444', paddingBottom: 8 }}>
              {new Date(createdAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={{ color }}>{status}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
              marginBottom: -18,
            }}
          >
            <Text
              style={{
                width: '33%',
                fontSize: 12,
                color: '#666',
              }}
            >
              customer
            </Text>
            <Text
              style={{
                width: '33%',
                fontSize: 12,
                color: '#666',
                textAlign: 'center',
              }}
            >
              cost
            </Text>
            <Text
              style={{
                width: '33%',
                fontSize: 12,
                color: '#666',
                textAlign: 'right',
              }}
            >
              payment method
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            <Text
              style={{
                width: '33%',
                fontSize: 18,
              }}
            >
              {customer}
            </Text>
            <Text
              style={{
                width: '33%',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              {cost}
            </Text>
            <Text
              style={{
                width: '33%',
                fontSize: 18,
                textAlign: 'right',
              }}
            >
              {payment}
            </Text>
          </View>
          <View
            style={{
              padding: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#666',
              }}
            >
              description
            </Text>
            <Text>{description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentReceipt: state.receipt.currentReceipt,
});
const mapDispatchToProps = {};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReceiptDetail)
);
