import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Localization } from 'expo';
import i18n from 'i18n-js';

import Home from '../screens/Home';
import Invoice from '../screens/Invoice';
import Profile from '../screens/Profile';
import FeatherIcon from '../components/FeatherIcon';
import { en, vi } from '../constants/localization';
import theme from '../constants/theme';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;
export const HomeStack = createStackNavigator(
  {
    Home,
    Profile,
  },
  {
    headerMode: 'none',
  }
);

const InvoiceStack = createStackNavigator(
  {
    Invoice,
  },
  {
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('dashboard', { locale: 'en' }),
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name="bar-chart-2" />
  ),
};

InvoiceStack.navigationOptions = {
  tabBarLabel: i18n.t('invoice', { locale: 'en' }),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="feather" />,
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    InvoiceStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default TabNavigator;
