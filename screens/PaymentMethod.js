/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';

import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { ItemCategory } from '../containers/PaymentMethod';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { FeatherIcon, Loading, Empty, Searchbar } from '../components';
import { logout, getCategories, removeCategory } from '../redux/actions';

class PaymentMethod extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
    visibleSnackbar: false,
  };

  componentDidMount = () => {
    this.props.getCategories(
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
    this.props.getCategories(
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
        this.props.getCategories(
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

  handleRemove = _id => {
    this.props.removeCategory(_id, {
      success: () => {
        LayoutAnimation.spring();
      },
      failure: () => {
        this.setState({ visibleSnackbar: true });
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
      categories,
      user: { info },
    } = this.props;
    const { searchText, refreshing, visibleSnackbar } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('paymentMethod')}</Typography>
            {info.role === ROLE.MANAGER ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentMethodAddition')}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            ) : (
              <FeatherIcon color={theme.colors.primary} name="plus" />
            )}
          </Header>
        </HeaderWrapper>
        <Searchbar value={searchText} onChangeText={this.handleSearch} />

        {categories ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!categories.categories.length ? (
              <Empty name={i18n.t('paymentMethod')} />
            ) : (
              categories.categories.map(category => (
                <ItemCategory
                  editable
                  disabled={info.role !== ROLE.MANAGER}
                  onEdit={() => {}}
                  onRemove={() => this.handleRemove(category._id)}
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  detail={category.detail}
                  time={
                    category.createdAt
                      ? new Date(category.createdAt).toLocaleDateString(
                          i18n.t('local'),
                          {
                            day: 'numeric',
                            month: 'long',
                          }
                        )
                      : null
                  }
                />
              ))
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => this.setState({ visibleSnackbar: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageDeleteFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: state.category.categories,
});
const mapDispatchToProps = {
  logout,
  removeCategory,
  getCategories,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentMethod)
);
