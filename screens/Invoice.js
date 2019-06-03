import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import { Localization } from 'expo';
import i18n from 'i18n-js';
import { en, vi } from '../constants/localization';

import AntDesignIcon from '../components/AntDesignIcon';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;
const ScreenContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px 10px 0px 10px;
  justify-content: space-between;
`;

const HeaderText = styled.Text`
  font-size: 18px;
`;

class Invoice extends React.Component {
  render() {
    return (
      <ScreenContainer>
        <HeaderWrapper>
          <AntDesignIcon name="checkcircle" />
          <HeaderText>{i18n.t('invoice', { locale: 'en' })}</HeaderText>
          <AntDesignIcon name="pluscircle" />
        </HeaderWrapper>
      </ScreenContainer>
    );
  }
}

export default Invoice;
