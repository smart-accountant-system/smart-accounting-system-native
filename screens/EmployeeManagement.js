/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { getEmployees } from '../redux/actions';

import theme from '../constants/theme';
import { FeatherIcon, Loading, Searchbar } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class EmployeeManagement extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getEmployees({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getEmployees({
      success: () => {
        this.setState({ refreshing: false });
      },
      failure: () => {},
    });
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getEmployees({
          params: {
            search: query,
          },
          success: () => {},
          failure: () => {},
        });
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
            <Typography>{i18n.t('employee')}</Typography>
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
              <Text key={employee._id}>{JSON.stringify(employee)}</Text>
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
