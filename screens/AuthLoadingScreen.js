/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import ROLE from '../constants/role';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { navigation } = this.props;
    const {
      user: { info },
    } = this.props;

    navigation.navigate(
      !info
        ? 'Login'
        : info.role === ROLE.MANAGER || info.role === ROLE.ACCOUNTANT
        ? 'TabNavigator'
        : 'StaffNavigator'
    );
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
