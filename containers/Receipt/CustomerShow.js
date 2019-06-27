import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';
import { CustomerItem } from '../CustomerManagement';

export default ({ currentCustomer, navigation }) => (
  <View>
    <Text
      style={{
        fontSize: 17,
        color: '#85261c',
        textAlign: 'center',
        paddingTop: 16,
      }}
    >
      {i18n.t('customer')}
    </Text>
    <CustomerItem
      disabled
      noBorder
      onPress={() => navigation.navigate('CustomerInReceipt')}
      name={currentCustomer.name}
      phone={currentCustomer.phone}
      address={currentCustomer.address}
    />
  </View>
);
