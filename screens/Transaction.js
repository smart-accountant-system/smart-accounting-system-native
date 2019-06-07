/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import i18n from 'i18n-js';

import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import TransactionItem from '../components/TransactionItem';
import { getTransactions } from '../redux/actions';

class Transaction extends React.Component {
  componentDidMount = () => {
    this.props.getTransactions({
      success: () => {},
      failure: () => {},
    });
  };

  render() {
    const { navigation, transactions } = this.props;
    console.log(transactions);
    const transaction = {
      debitAccount: 'Cash',
      creditAccount: 'Revenue',
      price: 'đ7,000,000',
      date: 'May 1, 2019',
    };
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('transaction')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper>
          <ScrollView>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TransactionDetail', { transaction })
              }
            >
              <TransactionItem
                fromAccount="Cash"
                toAccount="Revenue"
                price="đ7,000,000"
                date="May 1, 2019"
              />
            </TouchableOpacity>
          </ScrollView>
        </HomeBodyWrapper>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transaction,
});
const mapDispatchToProps = { getTransactions };

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transaction)
);
