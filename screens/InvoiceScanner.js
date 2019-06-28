/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';
import i18n from 'i18n-js';
import styled from 'styled-components';
import Layout from '../constants/Layout';
import theme from '../constants/theme';
import { NoCamera } from '../containers/Invoice';
import { getInvoiceById, logout } from '../redux/actions';
import { handle401 } from '../constants/strategies';

const ButtonWrapper = styled.View`
  background-color: #fff;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  position: absolute;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const Button = styled.TouchableOpacity`
  border-width: 2px;
  border-color: ${theme.colors.primary};
  width: 48px;
  height: 48px;
  border-radius: 24px;
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
          alert(`${i18n.t('messageCanNotGetInvoiceId')}\n${data}`);
          this.setState({ detecting: false });
        },
        handle401: () =>
          handle401({
            logout,
            navigation,
          }),
      });
    }
  };

  takePicture = async () => {};

  render() {
    const { hasCameraPermission, detecting } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
              justifyContent: 'center',
            }}
          >
            {!detecting ? (
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  width: Layout.deviceWidth,
                  height: Layout.deviceWidth,
                }}
              />
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceScanner);
