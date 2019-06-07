import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import theme from '../constants/theme';

const ReceiptContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default class ReceiptItem extends React.Component {
  render() {
    const { customer, type, date, price, item } = this.props;
    return (
      // <TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: 120,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomColor: theme.colors.grey,
          borderBottomWidth: 0.5,
          borderTopColor: theme.colors.grey,
          borderTopWidth: 0.5,
        }}
      >
        <ReceiptContentWrapper>
          <View>
            <Text style={{ fontSize: 18 }}>{customer}</Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              color: type === 0 ? theme.colors.pay : theme.colors.receive,
            }}
          >
            {type === 0 ? 'PAID' : 'RECEIVED'}
          </Text>
        </ReceiptContentWrapper>
        <ReceiptContentWrapper>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.grey,
              textAlign: 'right',
            }}
          >
            {date}
          </Text>
          <Text style={{ fontSize: 18, textAlign: 'right' }}>{price}</Text>
        </ReceiptContentWrapper>
      </View>
      // </TouchableOpacity>
    );
  }
}
