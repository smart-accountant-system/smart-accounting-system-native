import React from 'react';
import i18n from 'i18n-js';
import styled from 'styled-components';
import { RadioButton } from '../../components';

const RadioContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HihaText = styled.Text`
  padding-left: 8px;
`;

const RadioGroup = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 4px;
`;

const Radio = ({ selected, onPress, label }) => (
  <RadioContainer>
    <RadioButton selected={selected} onPress={onPress} />
    <HihaText>{label}</HihaText>
  </RadioContainer>
);

export default ({ type, firstPress, secondPress }) => (
  <RadioGroup>
    <Radio
      label={i18n.t('purchasedInvoice')}
      selected={type === 0}
      onPress={firstPress}
    />
    <Radio
      label={i18n.t('selledInvoice')}
      selected={type === 1}
      onPress={secondPress}
    />
  </RadioGroup>
);
