import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading, Asset, Font, Icon, Permissions, Localization } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';
import i18n from 'i18n-js';
import { MessageProvider } from './contexts';
import store, { persistor } from './redux/store';

import AppNavigator from './navigations/AppNavigator.js';
import font from './assets/fonts/Pacifico-Regular.ttf';
import SpaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import Cardo from './assets/fonts/Cardo-Regular.ttf';
import Kalam from './assets/fonts/Kalam-Regular.ttf';
import Alegreya from './assets/fonts/Alegreya-Regular.ttf';
import IndieFlower from './assets/fonts/IndieFlower.ttf';
import Enriqueta from './assets/fonts/Enriqueta-Regular.ttf';
import Roboto from './assets/fonts/Roboto-Regular.ttf';
import AvenirNext from './assets/fonts/AvenirNextLTPro-Regular.otf';
import AvenirNextBold from './assets/fonts/AvenirNextLTPro-Bold.otf';
import NotoSans from './assets/fonts/NotoSans-Regular.ttf';
import theme from './constants/theme';
import { en, vi } from './constants/localization';
import MiniOfflineSign from './components/MiniOfflineSign';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;
// i18n.locale = 'vi';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  };

  _loadResourcesAsync = async () =>
    Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        pacifico: font,
        'space-mono': SpaceMono,
        cardo: Cardo,
        kalam: Kalam,
        alegreya: Alegreya,
        'indie-flower': IndieFlower,
        enriqueta: Enriqueta,
        roboto: Roboto,
        'avenir-next': AvenirNext,
        'avenir-next-bold': AvenirNextBold,
        notosans: NotoSans,
      }),
    ]);

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MessageProvider>
              <PaperProvider theme={theme}>
                <AppNavigator />
                <MiniOfflineSign />
              </PaperProvider>
            </MessageProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
