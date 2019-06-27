/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import i18n from 'i18n-js';
import { Snackbar, Button } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { AmazingText } from '../containers/InvoiceAddition';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import {
  addReceiptToTransaction,
  getAccounts,
  getReceipts,
  addTransaction,
} from '../redux/actions';
import { handle401, toInt } from '../constants/strategies';
import { ReceiptShow, AccountShow } from '../containers/Transaction';

class ReceiptAddition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.props.getReceipts(
      {},
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
    this.props.getAccounts(
      {},
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleAdd = () => {
    const {
      navigation,
      currentReceiptInTracsaction,
      currentCreditAccountInTransaction,
      currentDebitAccountInTransaction,
    } = this.props;
    this.setState({ isLoading: true });
    this.props.addTransaction(
      {
        receipt: currentReceiptInTracsaction._id,
        amount: currentReceiptInTracsaction.payment.amountMoney,
        fromAccount: {
          id: currentCreditAccountInTransaction._id,
          type: 0,
        },
        toAccount: {
          id: currentDebitAccountInTransaction._id,
          type: 1,
        },
      },
      {
        success: () => {
          navigation.navigate('Transaction');
          this.setState({ isLoading: false });
        },
        failure: () => {
          this.setState({
            isVisible: true,
            isLoading: false,
          });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  render() {
    const {
      navigation,
      currentReceiptInTracsaction,
      currentCreditAccountInTransaction,
      currentDebitAccountInTransaction,
    } = this.props;
    const { isVisible, isLoading } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('transactionAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          {currentReceiptInTracsaction ? (
            <ReceiptShow
              receipt={currentReceiptInTracsaction}
              onPress={() => navigation.navigate('ReceiptsInTransaction')}
            />
          ) : (
            <AmazingText
              onPress={() => navigation.navigate('ReceiptsInTransaction')}
              content="Choose receipt"
            />
          )}
          {currentDebitAccountInTransaction ? (
            <AccountShow
              type="debit"
              onPress={() =>
                navigation.navigate('AccountsInTransaction', { type: 'debit' })
              }
              account={currentDebitAccountInTransaction}
              key={currentDebitAccountInTransaction._id}
            />
          ) : (
            <AmazingText
              onPress={() =>
                navigation.navigate('AccountsInTransaction', { type: 'debit' })
              }
              content="Choose Account to record Debit"
            />
          )}
          {currentCreditAccountInTransaction ? (
            <AccountShow
              type="credit"
              onPress={() =>
                navigation.navigate('AccountsInTransaction', { type: 'credit' })
              }
              account={currentCreditAccountInTransaction}
              key={currentCreditAccountInTransaction._id}
            />
          ) : (
            <AmazingText
              onPress={() =>
                navigation.navigate('AccountsInTransaction', { type: 'credit' })
              }
              content="Choose Account to record Credit"
            />
          )}
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleAdd}
              loading={isLoading}
            >
              <Text>{i18n.t('actionSave')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>

        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentReceiptInTracsaction:
    state.transaction.currentReceiptInTransactionAddition,
  currentCreditAccountInTransaction:
    state.transaction.currentCreditAccountInTransactionAddition,
  currentDebitAccountInTransaction:
    state.transaction.currentDebitAccountInTransactionAddition,
});
const mapDispatchToProps = {
  addReceiptToTransaction,
  getAccounts,
  getReceipts,
  addTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptAddition);
