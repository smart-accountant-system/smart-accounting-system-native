/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { getEmployees } from '../redux/actions';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { EmployeeItem } from '../containers/EmployeeManagement';
import { FeatherIcon, Loading, Searchbar } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class EmployeeManagement extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getEmployees(
      {},
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getEmployees(
      {},
      {
        success: () => {
          this.setState({ refreshing: false });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getEmployees(
          {
            search: query,
          },
          {
            handle401: () =>
              handle401({
                logout: this.props.logout,
                navigation: this.props.navigation,
              }),
          }
        );
      }, 300),
    });
  };

  render() {
    const { navigation, employees } = this.props;
    const { searchText, refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('employeeManagement')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <Searchbar
          value={searchText}
          placeholder="Search"
          onChangeText={this.handleSearch}
        />

        {employees ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {employees.employees.map(employee => (
              <EmployeeItem
                key={employee._id}
                onPress={() => {}}
                fullname={employee.fullname}
                username={employee.username}
                role={
                  employee.role === 1
                    ? 'Staff'
                    : employee.role === 2
                    ? 'Accountant'
                    : 'Manager'
                }
                color={
                  employee.role === 1
                    ? '#8ec448'
                    : employee.role === 2
                    ? '#f87d4d'
                    : '#e05246'
                }
                phone={employee.phone}
                email={employee.email}
              />
            ))}
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employee.employees,
});
const mapDispatchToProps = {
  getEmployees,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeManagement)
);
