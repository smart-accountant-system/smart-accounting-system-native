import React from 'react';
import { View, Text } from 'react-native';

import i18n from 'i18n-js';

import { CustomerInfoWrapper, InfoWrapper } from '../containers/Receipt';
import theme from '../constants/theme';

export default ({ customer }) => (
  <CustomerInfoWrapper>
    <InfoWrapper>
      <Text>{customer.name}</Text>
    </InfoWrapper>
    <InfoWrapper>
      <Text style={{ color: theme.colors.grey, textAlign: 'right' }}>
        {i18n.t('customer')}
      </Text>
      <Text style={{ textAlign: 'right' }}>{customer.phone}</Text>
    </InfoWrapper>
  </CustomerInfoWrapper>
);
