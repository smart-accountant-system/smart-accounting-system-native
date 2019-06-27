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
import { getPayments, getCustomers, addReceipt } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { PaymentShow, CustomerShow } from '../containers/Receipt';

class ReceiptAddition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.props.getPayments(
      {},
      {
        success: () => {},
        false: () => {},
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
    this.props.getCustomers(
      {},
      {
        success: () => {},
        false: () => {},
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleAdd = () => {
    const { navigation, currentCustomer, currentPayment } = this.props;
    this.setState({ isLoading: true });
    this.props.addReceipt(
      {
        payment: currentPayment._id,
        customer: currentCustomer._id,
      },
      {
        success: () => {
          navigation.navigate('Receipt');
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
    const { navigation, currentCustomer, currentPayment } = this.props;
    const { isVisible, isLoading } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('receiptAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          {currentPayment ? (
            <PaymentShow
              payment={currentPayment}
              onPress={() => navigation.navigate('PaymentInReceipt')}
            />
          ) : (
            <AmazingText
              onPress={() => navigation.navigate('PaymentInReceipt')}
              content={i18n.t('actionChoosePayment')}
            />
          )}
          {currentCustomer ? (
            <CustomerShow
              navigation={navigation}
              currentCustomer={currentCustomer}
            />
          ) : (
            <AmazingText
              onPress={() => navigation.navigate('CustomerInReceipt')}
              content={i18n.t('actionChooseCustomer')}
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
  payments: state.payment.payments,
  customers: state.customer.customers,
  currentCustomer: state.receipt.currentCustomerInReceiptAddition,
  currentPayment: state.receipt.currentPaymentInReceiptAddition,
});
const mapDispatchToProps = {
  getPayments,
  getCustomers,
  addReceipt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptAddition);
