/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, TextInput, Button, HelperText } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { handle401 } from '../constants/strategies';
import { logout, addCategory, getCategories } from '../redux/actions';

class PaymentMethodAddition extends React.Component {
  state = {
    name: '',
    detail: '',
    isVisible: false,
  };

  handleAddPaymentMethod = () => {
    const { name, detail } = this.state;
    this.props.addCategory(
      { name, detail },
      {
        success: () => {
          this.props.navigation.navigate('PaymentMethod');
          this.props.getCategories(
            {},
            {
              handle401: () =>
                handle401({
                  logout: this.props.logout,
                  navigation: this.props.navigation,
                }),
            }
          );
        },
        failure: () => {
          this.setState({
            isVisible: true,
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
    const { navigation, isLoading } = this.props;
    const { name, detail, isVisible } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentMethod')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography> Thêm phương thức thanh toán</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <View>
            <TextInput
              label="Tên phương thức"
              value={name}
              onChangeText={name => this.setState({ name, isVisible: false })}
              style={{ backgroundColor: '#fff' }}
            />
            <TextInput
              label="Mô tả chi tiết"
              numberOfLines={3}
              multiline
              style={{ backgroundColor: '#fff' }}
              value={detail}
              onChangeText={detail =>
                this.setState({ detail, isVisible: false })
              }
            />
            <HelperText type="error" visible={isVisible}>
              Thêm phương thức thanh toán không thành công
            </HelperText>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 20,
              }}
            >
              <Button
                mode="contained"
                style={{ width: 170 }}
                contentStyle={{ height: 50 }}
                onPress={this.handleAddPaymentMethod}
                loading={isLoading}
              >
                Lưu
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.category.isLoading,
});
const mapDispatchToProps = {
  logout,
  addCategory,
  getCategories,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentMethodAddition)
);
