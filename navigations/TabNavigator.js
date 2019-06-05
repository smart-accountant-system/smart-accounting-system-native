import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import i18n from 'i18n-js';
import { Localization } from 'expo';

import Home from '../screens/Home';
import Invoice from '../screens/Invoice';
import Profile from '../screens/Profile';
import Receipt from '../screens/Receipt';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import { en, vi } from '../constants/localization';

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

const ReceiptStack = createStackNavigator(
  {
    Receipt,
  },
  {
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('dashboard'),
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name="bar-chart-2" />
  ),
};

InvoiceStack.navigationOptions = {
  tabBarLabel: i18n.t('invoice'),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="feather" />,
};

ReceiptStack.navigationOptions = {
  tabBarLabel: i18n.t('receipt'),
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name="clipboard" />
  ),
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    InvoiceStack,
    ReceiptStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default TabNavigator;
