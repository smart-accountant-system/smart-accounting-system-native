import React from 'react';
import i18n from 'i18n-js';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

export default class InvoiceDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const invoice = navigation.getParam('invoice', '');
    const name = invoice.type === 0 ? 'Purchase' : 'Sale';
    const color = invoice.status ? '#438763' : '#ad6b8d';
    const status = invoice.status ? 'Paid' : 'Unpaid';
    const { createdAt, totalCost } = invoice;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoice')}</Typography>
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
            <Text style={{ fontSize: 20 }}>{name} Invoice</Text>
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
              padding: 8,
              marginBottom: -18,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                width: '30%',
                color: '#666',
              }}
            >
              product
            </Text>
            <Text
              style={{
                fontSize: 12,
                width: '15%',
                color: '#666',
                textAlign: 'right',
              }}
            >
              quantity
            </Text>
            <Text
              style={{
                fontSize: 12,
                width: '25%',
                color: '#666',
                textAlign: 'right',
              }}
            >
              unit price
            </Text>
            <Text
              style={{
                fontSize: 12,
                width: '30%',
                color: '#666',
                textAlign: 'right',
              }}
            >
              cost
            </Text>
          </View>
          {invoice.detail.map(({ product, quantity, unitPrice }) => (
            <View
              key={Math.random()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
                borderBottomColor: '#f1f1f1',
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ width: '30%', fontSize: 18 }}>{product}</Text>
              <Text style={{ width: '15%', textAlign: 'right' }}>
                {quantity}
              </Text>
              <Text style={{ width: '25%', textAlign: 'right' }}>
                {unitPrice}
              </Text>
              <Text style={{ width: '30%', textAlign: 'right', fontSize: 16 }}>
                {unitPrice * quantity}
              </Text>
            </View>
          ))}
          <View
            style={{
              padding: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#666',
                textAlign: 'right',
              }}
            >
              total cost
            </Text>
            <Text style={{ color, fontSize: 18, textAlign: 'right' }}>
              {totalCost}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
