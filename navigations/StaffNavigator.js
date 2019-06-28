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
import PaymentAddition from '../screens/PaymentAddition';
import Payment from '../screens/Payment';

import Receipt from '../screens/Receipt';
import ReceiptDetail from '../screens/ReceiptDetail';
import ReceiptAddition from '../screens/ReceiptAddition';
import PaymentInReceipt from '../screens/PaymentInReceipt';
import CustomerInReceipt from '../screens/CustomerInReceipt';

import InvoiceAddition from '../screens/InvoiceAddition';
import InvoiceProductAddition from '../screens/InvoiceProductAddition';

import CustomerManagement from '../screens/CustomerManagement';
import CustomerAddition from '../screens/CustomerAddition';
import theme from '../constants/theme';

export const HomeStack = createStackNavigator(
  {
    Home,
    Profile,
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
    Payment,
    InvoiceAddition,
    PaymentAddition,
    InvoiceProductAddition,
    InvoiceScanner,
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
    CustomerInReceipt,
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

const CustomerStack = createStackNavigator(
  {
    CustomerManagement,
    CustomerAddition,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      tabBarLabel: i18n.t('customer'),
      tabBarIcon: ({ focused }) => (
        <FeatherIcon focused={focused} name="users" />
      ),
    }),
  }
);

const StaffNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CustomerStack,
    InvoiceStack,
    ReceiptStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default StaffNavigator;
