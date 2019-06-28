/* eslint-disable no-shadow */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';
import { withNavigationFocus } from 'react-navigation';

import styled from 'styled-components';
import Layout from '../constants/Layout';
import theme from '../constants/theme';
import { NoCamera } from '../containers/Invoice';
import { getInvoiceById, logout } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const PlaceholderContainer = styled.View`
  width: ${Layout.deviceWidth}px;
  height: ${Layout.deviceWidth}px;
  justify-content: center;
`;

class InvoiceScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    detecting: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead = ({ data }) => {
    const { navigation, logout, getInvoiceById, invoices } = this.props;
    this.setState({ detecting: true });

    if (invoices.invoices.some(invoice => invoice._id === data)) {
      navigation.replace('InvoiceDetail', {
        _id: data,
      });
    } else {
      getInvoiceById(data, {
        success: () => {
          // this.setState({ detecting: false });
          navigation.replace('InvoiceDetail', {
            _id: data,
          });
        },
        failure: () => {
          Alert.alert(
            i18n.t('messageUnsuccess'),
            `${i18n.t('messageCanNotGetInvoiceId')}\n${data}`,
            [{ text: 'OK', onPress: () => this.setState({ detecting: false }) }]
          );
        },
        handle401: () =>
          handle401({
            logout,
            navigation,
          }),
      });
    }
  };

  render() {
    const { hasCameraPermission, detecting } = this.state;
    const { navigation, isFocused } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceScanner')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        {!hasCameraPermission ? (
          <NoCamera
            onPress={() => navigation.goBack()}
            message={i18n.t('messageNoAccessCamera')}
          />
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Container />

            {!detecting && isFocused ? (
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  width: Layout.deviceWidth,
                  height: Layout.deviceWidth,
                }}
              />
            ) : (
              <PlaceholderContainer>
                <ActivityIndicator size="large" color="#000" />
              </PlaceholderContainer>
            )}
            <Container>
              <Text
                style={{
                  fontSize: 12,
                  color: '#666',
                  padding: 16,
                  textAlign: 'center',
                }}
              >
                {i18n.t('messageGuildToScan')}
              </Text>
            </Container>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  getInvoiceById,
  logout,
};

export default withNavigationFocus(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvoiceScanner)
);
