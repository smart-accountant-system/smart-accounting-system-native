import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import TabNavigator from './TabNavigator';

const StackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login,
    TabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  }
);

export default createAppContainer(StackNavigator);
