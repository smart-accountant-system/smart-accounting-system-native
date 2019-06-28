/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import { Header, Typography, HeaderWrapper } from '../containers/Home';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { logout, getTransactionById } from '../redux/actions';
import { handle401 } from '../constants/strategies';

class TransactionDetail extends React.Component {
  state = {
    refreshing: false,
  };

  _onRefresh = () => {
    const { currentTransaction } = this.props;
    this.setState({ refreshing: true });
    this.props.getTransactionById(currentTransaction._id, {
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
    const { navigation } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('transactionDetail')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
        >
          <View>
            <Text>a</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentTransaction: state.transaction.currentTransaction,
});
const mapDispatchToProps = {
  logout,
  getTransactionById,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionDetail)
);
