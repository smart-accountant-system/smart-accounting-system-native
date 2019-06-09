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

import theme from '../constants/theme';
import { getCategories } from '../redux/actions';
import { ItemCategory } from '../containers/PaymentMethod';
import { FeatherIcon, Loading, Searchbar } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class PaymentMethod extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getCategories({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getCategories({
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
        this.props.getCategories({
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
    const { navigation, categories } = this.props;
    const { searchText, refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('category')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <Searchbar
          value={searchText}
          placeholder="Search"
          onChangeText={this.handleSearch}
        />

        {categories ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {categories.categories.map(category => (
              <ItemCategory
                key={category._id}
                id={category._id}
                name={category.name}
                detail={category.detail}
                time={
                  category.createdAt
                    ? new Date(category.createdAt).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'long',
                      })
                    : '7 thang 6'
                }
              >
                {JSON.stringify(category)}
              </ItemCategory>
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
  categories: state.category.categories,
});
const mapDispatchToProps = {
  getCategories,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentMethod)
);
