import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Localization } from 'expo';
import i18n from 'i18n-js';

import Home from '../screens/Home';
import Report from '../screens/Report';
import Invoice from '../screens/Invoice';
import Expanse from '../screens/Expanse';
import TabBarIcon from '../components/TabBarIcon';
import AntDesignIcon from '../components/AntDesignIcon';
import { en, vi } from '../constants/localization';
import theme from '../constants/theme';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;
export const HomeStack = createStackNavigator(
  {
    Home,
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

const ExpanseStack = createStackNavigator(
  {
    Expanse,
  },
  {
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('dashboard'),
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pie" />,
};

InvoiceStack.navigationOptions = {
  tabBarLabel: i18n.t('invoice'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-wallet" />
  ),
};

ExpanseStack.navigationOptions = {
  tabBarLabel: i18n.t('invoice'),
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pizza" />,
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    InvoiceStack,
    ExpanseStack,
    Report,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default TabNavigator;
