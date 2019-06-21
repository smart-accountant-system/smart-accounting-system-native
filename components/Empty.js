import React from 'react';
import i18n from 'i18n-js';
import styled from 'styled-components';

import empty from '../assets/empty.png';

const NiceView = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 400px;
`;

const EmptyPicture = styled.Image`
  width: 300px;
  height: 300px;
`;

const EmptyText = styled.Text`
  color: #444;
`;
export default ({ name }) => (
  <NiceView>
    <EmptyPicture source={empty} />
    <EmptyText>
      {i18n.t('messageEmpty')} {name.toLowerCase()}.
    </EmptyText>
  </NiceView>
);
