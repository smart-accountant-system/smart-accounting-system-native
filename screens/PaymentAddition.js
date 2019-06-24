/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import i18n from 'i18n-js';
import { Snackbar, Button, Dialog, Portal } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput, Empty } from '../components';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { TypePicker, AmazingText } from '../containers/InvoiceAddition';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import { getCategories, addPayment, getPayments } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import PaymentMethodItem from '../containers/PaymentMethod/Item';

class InvoiceProductAddition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amountMoney: '',
      description: '',
      type: 0,
      isVisible: false,
      isChoosing: false,
      currentPaymentMethodId: '',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.props.getCategories(
      {},
      {
        success: () => {},
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleAdd = () => {
    const { navigation } = this.props;
    const {
      amountMoney,
      description,
      type,
      currentPaymentMethodId,
    } = this.state;
    const _id = navigation.getParam('_id', '');
    this.setState({ isLoading: true });

    // call api to create payment for invoice(_id)
    if (currentPaymentMethodId !== '') {
      this.props.addPayment(
        {
          invoice: _id,
          category: currentPaymentMethodId,
          amountMoney: parseInt(amountMoney),
          description,
          type,
        },
        {
          success: () => {
            this.props.getPayments(
              {},
              {
                success: () => {
                  this.setState({ isLoading: false });
                  navigation.navigate('InvoiceDetail');
                },
                failure: () => {
                  this.setState({ isLoading: false });
                },
                handle401: () =>
                  handle401({
                    logout: this.props.logout,
                    navigation: this.props.navigation,
                  }),
              }
            );
          },
          failure: () => {
            this.setState({ isVisible: true });
          },
          handle401: () =>
            handle401({
              logout: this.props.logout,
              navigation: this.props.navigation,
            }),
        }
      );
    } else {
      this.setState({ isVisible: true });
    }
  };

  render() {
    const { navigation, categories } = this.props;
    const {
      amountMoney,
      description,
      type,
      isVisible,
      isChoosing,
      currentPaymentMethodId,
      isLoading,
    } = this.state;
    const currentPaymentMethod = categories.categories.find(
      category => category._id === currentPaymentMethodId
    );

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
            keyboardType="numeric"
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
            content={
              currentPaymentMethod
                ? `Payment method: ${currentPaymentMethod.name}`
                : 'Choose payment method'
            }
            onPress={() => this.setState({ isChoosing: true })}
          />

          {currentPaymentMethod && (
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
          )}
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
              <View style={{ height: 300 }}>
                <ScrollView>
                  {categories ? (
                    categories.categories.map(category => (
                      <PaymentMethodItem
                        key={category._id}
                        id={category._id}
                        name={category.name}
                        detail={category.detail}
                        time={
                          category.createdAt
                            ? new Date(category.createdAt).toLocaleDateString(
                                i18n.t('local'),
                                {
                                  day: 'numeric',
                                  month: 'long',
                                }
                              )
                            : null
                        }
                        onPress={() =>
                          this.setState({
                            currentPaymentMethodId: category._id,
                            isChoosing: false,
                          })
                        }
                        currentPaymentMethodId={currentPaymentMethodId}
                      />
                    ))
                  ) : (
                    <Empty name={i18n.t('paymentMethod')} />
                  )}
                </ScrollView>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
});
const mapDispatchToProps = {
  getCategories,
  addPayment,
  getPayments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceProductAddition);
