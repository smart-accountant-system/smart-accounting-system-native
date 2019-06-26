/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from 'react-native';

import {
  TypePicker,
  AmazingText,
  InvoiceDetail,
} from '../containers/InvoiceAddition';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { handle401 } from '../constants/strategies';
import { logout, addInvoice, getInvoices } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class InvoiceAddition extends React.Component {
  state = {
    type: 0,
    detail: [],
    isVisible: false,
    isLoading: false,
  };

  handleAddInvoice = () => {
    const { type, detail } = this.state;
    this.setState({ isLoading: true });
    this.props.addInvoice(
      {
        type,
        detail: detail.map(({ product, quantity, unitPrice }) => ({
          product,
          quantity,
          unitPrice,
        })),
      },
      {
        success: () => {
          this.props.navigation.navigate('Invoice');
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

  handleAdd = product => {
    LayoutAnimation.spring();
    const { detail } = this.state;
    this.setState({
      detail: [...detail, product],
    });
  };

  handleRemoveDetail = key => {
    const { detail } = this.state;
    LayoutAnimation.spring();
    this.setState({
      detail: detail.filter(item => item.key !== key),
    });
  };

  handleUpdateDate = ({ key, product, quantity, unitPrice }) => {
    const { detail } = this.state;

    LayoutAnimation.spring();
    this.setState({
      detail: detail.map(item =>
        item.key === key
          ? {
              key,
              product,
              quantity,
              unitPrice,
            }
          : item
      ),
    });
  };

  render() {
    const { navigation } = this.props;
    const { detail, isVisible, type, isLoading } = this.state;
    const totalCost = detail.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>

        <TypePicker
          type={type}
          firstPress={() => this.setState({ type: 0 })}
          secondPress={() => this.setState({ type: 1 })}
        />

        <ScrollView>
          <InvoiceDetail
            detail={detail}
            totalCost={totalCost}
            navigation={navigation}
            handleUpdateDate={this.handleUpdateDate}
            handleRemoveDetail={this.handleRemoveDetail}
          />
          <AmazingText
            content={i18n.t('accountAddProduct')}
            onPress={() => {
              navigation.navigate('InvoiceProductAddition', {
                handleAdd: this.handleAdd,
              });
            }}
          />
          {detail.length > 0 && (
            <FewStyledContainer paddingTop>
              <Button
                mode="contained"
                style={{ width: 170 }}
                contentStyle={{ height: 50 }}
                onPress={this.handleAddInvoice}
                loading={isLoading}
              >
                <Text>{i18n.t('actionSave')}</Text>
              </Button>
            </FewStyledContainer>
          )}
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

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  logout,
  addInvoice,
  getInvoices,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvoiceAddition)
);
