import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import i18n from 'i18n-js';
import { Localization } from 'expo';

import Home from '../screens/Home';
import Invoice from '../screens/Invoice';
import InvoiceDetail from '../screens/InvoiceDetail';
import Profile from '../screens/Profile';
import Receipt from '../screens/Receipt';
import ReceiptDetail from '../screens/ReceiptDetail';
import FeatherIcon from '../components/FeatherIcon';
import Transaction from '../screens/Transaction';
import TransactionDetail from '../screens/TransactionDetail';
import Account from '../screens/Account';
import AccountDetail from '../screens/AccountDetail';
import PaymentMethod from '../screens/PaymentMethod';
import theme from '../constants/theme';
import { en, vi } from '../constants/localization';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

export const HomeStack = createStackNavigator(
  {
    Home,
    PaymentMethod,
    Profile,
  },
  {
    headerMode: 'none',
  }
);

const InvoiceStack = createStackNavigator(
  {
    Invoice,
    InvoiceDetail,
  },
  {
    headerMode: 'none',
  }
);

const ReceiptStack = createStackNavigator(
  {
    Receipt,
    ReceiptDetail,
  },
  {
    headerMode: 'none',
  }
);

const TransactionStack = createStackNavigator(
  {
    Transaction,
    TransactionDetail,
  },
  {
    headerMode: 'none',
  }
);

const AccountStack = createStackNavigator(
  {
    Account,
    AccountDetail,
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

TransactionStack.navigationOptions = {
  tabBarLabel: i18n.t('transaction'),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="link" />,
};

AccountStack.navigationOptions = {
  tabBarLabel: i18n.t('account'),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="book" />,
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    AccountStack,
    InvoiceStack,
    ReceiptStack,
    TransactionStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default TabNavigator;
