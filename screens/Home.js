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
  MenuContainer,
  MenuItem,
  FieldContainer,
  StyledField,
} from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import { logout } from '../redux/actions';

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
        <ScrollView>
          <MenuContainer>
            <MenuItem
              onPress={() => navigation.navigate('PaymentMethod')}
              icon="shopping-cart"
              number={23}
              name={i18n.t('paymentMethod')}
            />

            <FieldContainer>
              <StyledField left>
                <MenuItem
                  mini
                  onPress={() => {}}
                  color="#f87d4d"
                  icon="briefcase"
                  number={11}
                  name={i18n.t('employeeList')}
                />
              </StyledField>
              <StyledField right>
                <MenuItem
                  mini
                  onPress={() => {}}
                  color="#e05246"
                  icon="users"
                  number={32}
                  name={i18n.t('customerList')}
                />
              </StyledField>
            </FieldContainer>
          </MenuContainer>
        </ScrollView>
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
