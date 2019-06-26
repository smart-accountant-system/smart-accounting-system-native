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
import { getPayments, getCustomers } from '../redux/actions';
import { handle401, toInt } from '../constants/strategies';

class InvoiceProductAddition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      currentPayment: '',
      currentCustomer: '',
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

  handleAdd = () => {};

  render() {
    const { navigation, payments, customers } = this.props;
    const { isVisible, currentPayment, currentCustomer } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('paymentAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <AmazingText
            onPress={() => navigation.navigate('PaymentInReceipt')}
            content={
              currentPayment
                ? `Payment: ${currentPayment.name}`
                : 'Choose payment'
            }
          />
          <AmazingText
            content={
              currentCustomer
                ? `Customer: ${currentCustomer.name}`
                : 'Choose customer'
            }
          />

          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleAdd}
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
});
const mapDispatchToProps = {
  getPayments,
  getCustomers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceProductAddition);
