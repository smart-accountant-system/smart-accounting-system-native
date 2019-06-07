import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import i18n from 'i18n-js';
import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
  FeatureText,
  FeatureHeaderWrapper,
  FeatureContent,
  InforWrapper,
} from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import { logout } from '../redux/actions';
import ProfileInfo from '../components/ProfileInfo';

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
        <HomeBodyWrapper>
          <ScrollView>
            <FeatureHeaderWrapper>
              <FeatureText>{i18n.t('menu')}</FeatureText>
            </FeatureHeaderWrapper>
            <FeatureContent>
              <ProfileInfo
                name="shopping-cart"
                info={i18n.t('paymentMethod')}
              />
              <ProfileInfo name="briefcase" info={i18n.t('employeeList')} />
              <ProfileInfo name="users" info={i18n.t('customerList')} />
            </FeatureContent>
          </ScrollView>
        </HomeBodyWrapper>
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
