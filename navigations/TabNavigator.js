import { createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Report from '../screens/Report';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Report,
  },
  {}
);

export default TabNavigator;
