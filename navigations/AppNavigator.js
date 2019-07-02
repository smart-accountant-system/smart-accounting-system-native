import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';

import LoginNavigator from './LoginNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import TabNavigator from './TabNavigator';
import StaffNavigator from './StaffNavigator';

const StackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    LoginNavigator,
    TabNavigator,
    StaffNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(StackNavigator);

const Navigation = ({ localization }) => (
  <AppContainer screenProps={{ localization }} />
);

export default connect(state => ({
  localization: state.user.localization,
}))(Navigation);
