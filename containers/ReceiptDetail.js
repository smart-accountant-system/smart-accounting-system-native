import React from 'react';
import { View, Text } from 'react-native';
import i18n from 'i18n-js';

export const ReceiptHeader = ({ type, createdAt, color, status }) => (
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
      {new Date(createdAt).toLocaleDateString(i18n.t('local'), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
    </Text>

    <Text style={{ color }}>{status}</Text>
  </View>
);

export const ReceiptDetailBody = ({ customer, cost, payment, description }) => (
  <View>
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
          textTransform: 'lowercase',
        }}
      >
        {i18n.t('customer')}
      </Text>
      <Text
        style={{
          width: '33%',
          fontSize: 12,
          color: '#666',
          textAlign: 'center',
          textTransform: 'lowercase',
        }}
      >
        {i18n.t('cost')}
      </Text>
      <Text
        style={{
          width: '33%',
          fontSize: 12,
          color: '#666',
          textAlign: 'right',
          textTransform: 'lowercase',
        }}
      >
        {i18n.t('paymentMethod')}
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
          textTransform: 'lowercase',
        }}
      >
        {i18n.t('description')}
      </Text>
      <Text>{description}</Text>
    </View>
  </View>
);
