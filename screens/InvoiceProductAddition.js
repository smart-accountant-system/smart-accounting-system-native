/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { InvoiceDetailContainer } from '../containers/InvoiceAddition';
import { logout, addCategory, getCategories } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

export default class InvoiceProductAddition extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const { product, quantity, unitPrice } = navigation.getParam('product', '');
    console.log(product, quantity, unitPrice);

    this.state = {
      product: product || '',
      quantity: quantity ? quantity.toString() : '',
      unitPrice: unitPrice ? unitPrice.toString() : '',
      isVisible: false,
    };
  }

  valid = () => {
    const { product, quantity, unitPrice } = this.state;
    const numQuantity = parseInt(quantity || 0);
    const numUnitPrice = parseInt(unitPrice || 0);
    const lengthQ = Math.trunc(Math.log(numQuantity) / Math.log(10)) + 1;
    const lengthU = Math.trunc(Math.log(numUnitPrice) / Math.log(10)) + 1;

    return (
      product.length === 0 ||
      lengthQ !== quantity.length ||
      lengthU !== unitPrice.length
    );
  };

  handleAddData = () => {
    const validate = this.valid();
    this.setState({ isVisible: validate });

    if (!validate) {
      const { product, quantity, unitPrice } = this.state;
      const numQuantity = parseInt(quantity || 0);
      const numUnitPrice = parseInt(unitPrice || 0);
      const { navigation } = this.props;
      const handleAdd = navigation.getParam('handleAdd', '');
      handleAdd({
        key: Math.random(),
        product,
        quantity: numQuantity,
        unitPrice: numUnitPrice,
      });
      navigation.navigate('InvoiceAddition');
    }
  };

  handleUpdateData = () => {
    const validate = this.valid();
    this.setState({ isVisible: validate });

    if (!validate) {
      const { product, quantity, unitPrice } = this.state;
      const numQuantity = parseInt(quantity || 0);
      const numUnitPrice = parseInt(unitPrice || 0);
      const { navigation } = this.props;
      const handleUpdate = navigation.getParam('handleUpdate', '');
      const { key } = navigation.getParam('product', '');
      handleUpdate({
        key,
        product,
        quantity: numQuantity,
        unitPrice: numUnitPrice,
      });
      navigation.navigate('InvoiceAddition');
    }
  };

  render() {
    const { navigation } = this.props;
    const { key } = navigation.getParam('product', '');

    const { product, quantity, unitPrice, isVisible } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('InvoiceAddition')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceProduceAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <InvoiceDetailContainer>
            <View style={{ width: '100%' }}>
              <InterestTextInput
                label={i18n.t('name')}
                value={product}
                onChangeText={product => this.setState({ product })}
              />
            </View>

            <View
              style={{
                width: '50%',
                borderRightColor: '#ccc',
                borderRightWidth: 1,
              }}
            >
              <InterestTextInput
                label={i18n.t('quantity')}
                value={quantity}
                keyboardType="phone-pad"
                onChangeText={quantity => this.setState({ quantity })}
              />
            </View>
            <View style={{ width: '50%' }}>
              <InterestTextInput
                label={i18n.t('unitPrice')}
                value={unitPrice}
                keyboardType="phone-pad"
                onChangeText={unitPrice => this.setState({ unitPrice })}
              />
            </View>
          </InvoiceDetailContainer>
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={key ? this.handleUpdateData : this.handleAddData}
            >
              <Text>{key ? i18n.t('actionUpdate') : i18n.t('actionAdd')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>

        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {key ? i18n.t('messageUpdateFail') : i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}
