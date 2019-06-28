/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { handle401 } from '../constants/strategies';
import { AmazingText } from '../containers/InvoiceAddition';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { logout, getInvoiceById } from '../redux/actions';
import InvoiceDetailSection from '../containers/InvoiceDetail';

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this._id = navigation.getParam('_id', '');
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getInvoiceById(this._id, {
      success: () => {
        this.setState({ refreshing: false });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  getNewestInvoice = () => {
    const {
      invoices: { invoices },
    } = this.props;

    for (let i = 0; i < invoices.length; i++)
      if (invoices[i]._id == this._id) {
        return invoices[i];
      }
  };

  render() {
    const {
      navigation,
      user: { info },
    } = this.props;
    const { refreshing } = this.state;

    const invoice = this.getNewestInvoice();
    const { payments } = invoice;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceDetail')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
        >
          <InvoiceDetailSection currentInvoice={invoice} />

          {info.role === ROLE.STAFF ? (
            <AmazingText
              content={i18n.t('actionAddPayment')}
              onPress={() => {
                console.log('im here');

                navigation.navigate('PaymentAddition', {
                  _id: invoice._id,
                });
              }}
            />
          ) : null}
          {payments && (
            <AmazingText
              content={i18n.t('actionShowPayment')}
              onPress={() => {
                navigation.navigate('Payment', {
                  _id: invoice._id,
                });
              }}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  logout,
  getInvoiceById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
