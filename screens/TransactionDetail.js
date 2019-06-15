import React from 'react';
import i18n from 'i18n-js';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon, ReceiptItem } from '../components';

class TransactionDetail extends React.Component {
  render() {
    const { navigation, currentTransaction } = this.props;
    console.log(currentTransaction);
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('transactionDetail')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <View>
            <Text>a</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentTransaction: state.transaction.currentTransaction,
});
const mapDispatchToProps = {};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionDetail)
);
