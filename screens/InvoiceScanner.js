import React from 'react';
import { View } from 'react-native';
import { Camera, Permissions } from 'expo';
import i18n from 'i18n-js';
import styled from 'styled-components';

import { Message, NoCamera, HeaderButton } from '../containers/Invoice';
import theme from '../constants/theme';

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

const LoadingOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 15px;
`;

export default class InvoiceScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    detecting: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

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
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={cam => {
              this.camera = cam;
            }}
          >
            {!detecting ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <HeaderButton
                  iconColor="#fff"
                  onPress={() => navigation.goBack()}
                />
                <Message>{i18n.t('messageScanInvoice')}</Message>
                <ButtonWrapper>
                  <Button onPress={this.takePicture} />
                </ButtonWrapper>
              </View>
            ) : (
              <LoadingOverlay>
                <Loading>{i18n.t('detecting')}</Loading>
              </LoadingOverlay>
            )}
          </Camera>
        )}
      </View>
    );
  }
}
