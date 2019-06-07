import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import i18n from 'i18n-js';

import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';

class Account extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
            <Typography>{i18n.t('account')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
