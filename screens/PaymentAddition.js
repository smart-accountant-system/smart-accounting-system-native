/* eslint-disable no-shadow */
import React from 'react';
import i18n from 'i18n-js';
import { Snackbar, Button, Dialog, Portal } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { TypePicker, AmazingText } from '../containers/InvoiceAddition';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

export default class InvoiceProductAddition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amountMoney: '',
      description: '',
      type: 0,
      isVisible: false,
      isChoosing: false,
    };
  }

  handleAdd = () => {
    const { navigation } = this.props;
    const _id = navigation.getParam('_id', '');

    // call api to create payment for invoice(_id)
  };

  render() {
    const { navigation } = this.props;
    const {
      amountMoney,
      description,
      type,
      isVisible,
      isChoosing,
    } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('InvoiceDetail')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('paymentAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>

        <TypePicker
          type={type}
          firstLabel={i18n.t('paymentIn')}
          firstPress={() => this.setState({ type: 0 })}
          secondLabel={i18n.t('paymentOut')}
          secondPress={() => this.setState({ type: 1 })}
        />
        <ScrollView>
          <InterestTextInput
            label={i18n.t('amountMoney')}
            value={amountMoney}
            onChangeText={amountMoney => this.setState({ amountMoney })}
          />
          <InterestTextInput
            label={i18n.t('description')}
            numberOfLines={3}
            multiline
            value={description}
            onChangeText={description => this.setState({ description })}
          />
          <AmazingText
            content="Choose payment method"
            onPress={() => this.setState({ isChoosing: true })}
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
        <Portal>
          <Dialog dismissable={false} visible={isChoosing}>
            <Dialog.Title>Choose payment method</Dialog.Title>
            <Dialog.Content>
              <Text>
                Đổ list payment method lên đây, làm cái touchableopacity cho
                user chọn
              </Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
