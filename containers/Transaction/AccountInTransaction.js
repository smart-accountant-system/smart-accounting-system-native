import React from 'react';
import i18n from 'i18n-js';
import { View, Text } from 'react-native';

import { AccountContent } from '../Account';
import StyledItem from '../../components/StyledItem';

const AccountInTransaction = ({ account, onPress, noBorder }) => (
  <StyledItem onPress={onPress} debit={account.debit} credit={account.credit}>
    <AccountContent
      name={account.name}
      description={account.description}
      color={account.debit > account.credit ? '#438763' : '#ad6b8d'}
      balance={Math.abs(account.debit - account.credit)}
      balanceType={
        account.debit > account.credit ? 'Debit balance' : 'Credit balance'
      }
      time={new Date(account.createdAt).toLocaleDateString(i18n.t('local'), {
        day: 'numeric',
        month: 'long',
      })}
      noBorder={noBorder}
    />
  </StyledItem>
);

export const AccountShow = ({ account, onPress }) => (
  <View>
    <Text
      style={{
        fontSize: 17,
        color: '#85261c',
        textAlign: 'center',
        paddingTop: 16,
      }}
    >
      {i18n.t('account')}
    </Text>
    <AccountInTransaction account={account} onPress={onPress} noBorder />
  </View>
);

export default AccountInTransaction;
