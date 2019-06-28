import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import i18n from 'i18n-js';
import FeatherIcon from '../components/FeatherIcon';

import Home from '../screens/Home';
import Profile from '../screens/Profile';

import Invoice from '../screens/Invoice';
import InvoiceDetail from '../screens/InvoiceDetail';
import InvoiceScanner from '../screens/InvoiceScanner';
import Payment from '../screens/Payment';

import Receipt from '../screens/Receipt';
import ReceiptDetail from '../screens/ReceiptDetail';
import ReceiptAddition from '../screens/ReceiptAddition';
import PaymentInReceipt from '../screens/PaymentInReceipt';

import Transaction from '../screens/Transaction';
import TransactionDetail from '../screens/TransactionDetail';
import TransactionAddition from '../screens/TransactionAddition';
import ReceiptsInTransaction from '../screens/ReceiptsInTransaction';
import AccountsInTransaction from '../screens/AccountsInTransaction';

import Account from '../screens/Account';
import AccountDetail from '../screens/AccountDetail';
import AccountAddition from '../screens/AccountAddition';

import PaymentMethod from '../screens/PaymentMethod';
import PaymentMethodAddition from '../screens/PaymentMethodAddition';

import EmployeeManagement from '../screens/EmployeeManagement';
import EmployeeAddition from '../screens/EmployeeAddition';

import CustomerManagement from '../screens/CustomerManagement';
import CustomerAddition from '../screens/CustomerAddition';
import theme from '../constants/theme';

export const HomeStack = createStackNavigator(
  {
    Home,
    Profile,

    PaymentMethod,
    PaymentMethodAddition,

    EmployeeManagement,
    EmployeeAddition,

    CustomerAddition,
    CustomerManagement,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('dashboard'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="bar-chart-2" />
      ),
    }),
  }
);

const InvoiceStack = createStackNavigator(
  {
    Invoice,
    InvoiceDetail,
    InvoiceScanner,
    Payment,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('invoice'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="feather" />
      ),
    }),
  }
);

const ReceiptStack = createStackNavigator(
  {
    Receipt,
    ReceiptDetail,
    ReceiptAddition,
    PaymentInReceipt,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('receipt'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="clipboard" />
      ),
    }),
  }
);

const TransactionStack = createStackNavigator(
  {
    Transaction,
    TransactionDetail,
    TransactionAddition,
    ReceiptsInTransaction,
    AccountsInTransaction,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('transaction'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="link" />
      ),
    }),
  }
);

const AccountStack = createStackNavigator(
  {
    Account,
    AccountDetail,
    AccountAddition,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('account'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="book" />
      ),
    }),
  }
);

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
