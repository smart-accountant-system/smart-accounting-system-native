import React from 'react';
import i18n from 'i18n-js';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';

export default class AccountDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const account = navigation.getParam('account', '');
    const color = account.debit > account.credit ? '#438763' : '#ad6b8d';
    // I have no idea for this
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <View
            style={{
              padding: 15,
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color,
                textAlign: 'center',
                paddingRight: 16,
              }}
            >
              {account.name}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ flexWrap: 'wrap' }}>
                {account.description} {account.description}{' '}
                {account.description} {account.description}{' '}
                {account.description} {account.description}{' '}
                {account.description} a a a a a a a a a a a a a a a a a a a a a
                a a a a a a a a a
              </Text>
              <Text style={{ textAlign: 'right', marginTop: 8 }}>
                {new Date(account.createdAt).toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
            }}
          >
            <View
              style={{
                width: '50%',
                borderRightWidth: 1,
                borderRightColor: '#f1f1f1',
              }}
            >
              <Text style={{ color: '#444' }}>Debit</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#438763',
                }}
              >
                {account.debit}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                borderLeftWidth: 1,
                borderLeftColor: '#f1f1f1',
              }}
            >
              <Text style={{ color: '#444', textAlign: 'right' }}>Credit</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#ad6b8d',
                  textAlign: 'right',
                }}
              >
                {account.credit}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
