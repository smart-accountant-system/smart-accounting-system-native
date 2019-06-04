import React from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import i18n from 'i18n-js';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import { logout } from '../actions';

class Home extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <StatusBar barStyle="light-content" />
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <FeatherIcon color={theme.colors.white} name="user" />
            </TouchableOpacity>
            <Typography>{i18n.t('dashboard')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  info: state.user,
});
const mapDispatchToProps = {
  logout,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
