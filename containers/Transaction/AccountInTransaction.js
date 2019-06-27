import React from 'react';
import i18n from 'i18n-js';

import { AccountContent } from '../Account';
import StyledItem from '../../components/StyledItem';

export default ({ account }) => (
  <StyledItem debit={account.debit} credit={account.credit}>
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
    />
  </StyledItem>
);
