/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout, addCustomer, updateCustomer } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class CustomerAddition extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { _id, name, phone, address } = navigation.getParam('customer', '');
    this._id = _id;
    this.state = {
      name: name || '',
      phone: phone || '',
      address: address || '',
      isVisible: false,
      isLoading: false,
    };
  }

  handleAddCustomer = () => {
    const { name, phone, address } = this.state;
    this.setState({ isLoading: true });
    this.props.addCustomer(
      { name, phone, address },
      {
        success: () => {
          // this.setState({ isLoading: false });
          this.props.navigation.navigate('CustomerManagement');
        },
        failure: () =>
          this.setState({
            isVisible: true,
            isLoading: false,
          }),
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleUpdate = () => {
    const { name, phone, address } = this.state;
    this.setState({ isLoading: true });
    this.props.updateCustomer(
      this._id,
      { name, phone, address },
      {
        success: () => this.props.navigation.goBack(),
        failure: () =>
          this.setState({
            isVisible: true,
            isLoading: false,
          }),
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const { name, phone, address, isVisible, isLoading } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerManagement')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>
              {this._id ? i18n.t('customerUpdate') : i18n.t('customerAddition')}
            </Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

        <ScrollView>
          <InterestTextInput
            label={i18n.t('name')}
            value={name}
            onChangeText={name => this.setState({ name })}
          />
          <InterestTextInput
            label={i18n.t('phone')}
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <InterestTextInput
            label={i18n.t('address')}
            value={address}
            numberOfLines={3}
            multiline
            onChangeText={address => this.setState({ address })}
          />
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this._id ? this.handleUpdate : this.handleAddCustomer}
              loading={isLoading}
            >
              <Text>
                {this._id ? i18n.t('actionUpdate') : i18n.t('actionSave')}
              </Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {this._id ? i18n.t('messageUpdateFail') : i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.customer.error,
});
const mapDispatchToProps = {
  logout,
  addCustomer,
  updateCustomer,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerAddition)
);
