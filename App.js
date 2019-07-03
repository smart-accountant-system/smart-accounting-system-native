import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading, Font, Icon, Permissions, Linking } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';
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
import MiniOfflineSign from './components/MiniOfflineSign';
import NavigationService from './components/NavigationService';

import LocaleWrapper from './components/LocaleWrapper';
import { initLocale } from './locale';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    initLocale();
  }

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log(`Initial url is: ${url}`);
          // NavigationService.navigate('PasswordChange', { url });
        }
      })
      .catch(err => console.error('An error occurred', err));
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

    const prefix = Linking.makeUrl('/');

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
            <LocaleWrapper>
              <MessageProvider>
                <PaperProvider theme={theme}>
                  <StatusBar barStyle="light-content" />
                  <AppNavigator
                    ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                    uriPrefix={prefix}
                  />
                  <MiniOfflineSign />
                </PaperProvider>
              </MessageProvider>
            </LocaleWrapper>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
