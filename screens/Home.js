/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {
  HeaderWrapper,
  Header,
  Typography,
  MenuContainer,
  MenuItem,
  FieldContainer,
  StyledField,
} from '../containers/Home';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading } from '../components';
import { logout, getDashboard } from '../redux/actions';

class Home extends React.Component {
  state = {
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getDashboard({
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getDashboard({
      success: () => {
        this.setState({ refreshing: false });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  render() {
    const {
      navigation,
      dashboard,
      user: { info, localization },
    } = this.props;
    const { refreshing } = this.state;
    console.log(localization);

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <FeatherIcon color={theme.colors.white} name="user" />
            </TouchableOpacity>
            <Typography>{i18n.t('dashboard')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        {dashboard ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {info.role !== ROLE.STAFF && (
              <MenuContainer>
                <MenuItem
                  onPress={() => navigation.navigate('PaymentMethod')}
                  icon="shopping-cart"
                  number={dashboard.totalCategory}
                  name={i18n.t('paymentMethod')}
                />
                {info.role !== ROLE.ACCOUNTANT ? (
                  <FieldContainer>
                    <StyledField left={1}>
                      <MenuItem
                        mini
                        onPress={() =>
                          navigation.navigate('EmployeeManagement')
                        }
                        color="#f87d4d"
                        icon="briefcase"
                        number={dashboard.totalEmployee}
                        name={i18n.t('employee')}
                      />
                    </StyledField>
                    <StyledField right={1}>
                      <MenuItem
                        mini
                        onPress={() =>
                          navigation.navigate('CustomerManagement')
                        }
                        color="#e05246"
                        icon="users"
                        number={dashboard.totalCustomer}
                        name={i18n.t('customer')}
                      />
                    </StyledField>
                  </FieldContainer>
                ) : (
                  <MenuItem
                    onPress={() => navigation.navigate('CustomerManagement')}
                    color="#e05246"
                    icon="users"
                    number={dashboard.totalCustomer}
                    name={i18n.t('customer')}
                  />
                )}
              </MenuContainer>
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dashboard: state.dashboard.dashboard,
});
const mapDispatchToProps = {
  logout,
  getDashboard,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
