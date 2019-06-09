/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Searchbar } from 'react-native-paper';
import i18n from 'i18n-js';
import { getCategories } from '../redux/actions';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import Loading from '../components/Loading';

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

  categoryDetail = category => {
    const { navigation } = this.props;
    navigation.navigate('AccountDetail', { category });
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getAccounts({
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
          style={{
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            borderBottomWidth: 2,
            borderBottomColor: '#f1f1f1',
          }}
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
              <Text key={category._id}>{JSON.stringify(category)}</Text>
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
