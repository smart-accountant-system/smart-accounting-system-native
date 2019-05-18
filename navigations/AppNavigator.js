import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from '../screens/Login';

import TabNavigator from './TabNavigator';

const StackNavigator = createSwitchNavigator(
  {
    Login,
    TabNavigator,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(StackNavigator);
