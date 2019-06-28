/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import Filter from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Empty } from '../components';
import { TransactionContent } from '../containers/Transaction';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import {
  logout,
  getTransactions,
  chooseTransaction,
  deleteTransactionById,
} from '../redux/actions';
import SnackBar from '../components/Message/SnackBar';

class Transaction extends React.Component {
  state = {
    isDatePickerVisible: false,
    activatingDate: undefined,
    fromDate: new Date(),
    toDate: new Date(),

    isExpandingFilter: false,
    filterHeight: new Animated.Value(0),

    refreshing: false,
    deleteFailNotification: false,
    loading: false,
  };

  componentDidMount = () => {
    this.props.getTransactions(
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
    this.setState({ refreshing: true });
    this.props.getTransactions(
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

  showDateTimePicker = activatingDate => {
    this.setState({ isDatePickerVisible: true, activatingDate });
  };

  hideDateTimePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDatePicked = date => {
    const { activatingDate } = this.state;
    if (activatingDate === i18n.t('from')) {
      this.setState({
        fromDate: new Date(date),
      });
    } else {
      this.setState({
        toDate: new Date(date),
      });
    }
    this.hideDateTimePicker();
  };

  handlePressFilter = () => {
    const { isExpandingFilter, filterHeight } = this.state;

    if (!isExpandingFilter) {
      Animated.spring(filterHeight, {
        toValue: 135,
      }).start();
    } else {
      Animated.timing(filterHeight, {
        toValue: 0,
      }).start();
    }

    this.setState({
      isExpandingFilter: !isExpandingFilter,
    });
  };

  doFilter = () => {
    const { filterHeight, fromDate, toDate } = this.state;
    this.setState({ loading: true });

    Animated.timing(filterHeight, {
      toValue: 0,
    }).start();

    this.setState({
      isExpandingFilter: false,
    });

    this.props.getTransactions(
      {
        startDate: new Date(fromDate.toDateString()),
        endDate: new Date(toDate.toDateString()),
      },
      {
        success: () => {
          this.setState({ loading: false });
        },
        failure: () => {
          this.setState({ loading: false });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  transactionDetail = transaction => {
    const { navigation } = this.props;
    this.props.chooseTransaction(transaction);
    navigation.navigate('TransactionDetail');
  };

  handleRemoveTransaction = id => {
    this.props.deleteTransactionById(id, {
      success: () => {
        LayoutAnimation.spring();
      },
      failure: () => {
        this.setState({ deleteFailNotification: true });
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
      transactions,
      user: { info },
    } = this.props;
    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
      refreshing,
      deleteFailNotification,
      loading,
    } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('transaction')}</Typography>
            {info.role === ROLE.ACCOUNTANT ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('TransactionAddition')}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            ) : (
              <FeatherIcon color={theme.colors.primary} name="plus" />
            )}
          </Header>
        </HeaderWrapper>

        <Filter
          isExpand={this.state.isExpandingFilter}
          filterHeight={this.state.filterHeight}
          isDatePickerVisible={isDatePickerVisible}
          fromDate={fromDate}
          toDate={toDate}
          hideDateTimePicker={this.hideDateTimePicker}
          handleDatePicked={this.handleDatePicked}
          handlePressFilter={this.handlePressFilter}
          showDateTimePicker={this.showDateTimePicker}
          activatingDate={activatingDate}
          doFilter={this.doFilter}
        />

        {transactions && !loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!transactions.transactions.length ? (
              <Empty name={i18n.t('transaction')} />
            ) : (
              transactions.transactions.map(transaction => (
                <TransactionContent
                  key={transaction._id}
                  // onPress={() => this.transactionDetail(transaction)}
                  disabled={info.role !== ROLE.ACCOUNTANT}
                  id={transaction._id}
                  checkedBy={transaction.checkedBy.fullname}
                  fromColor={
                    transaction.fromAccount.type === 0 ? '#438763' : '#ad6b8d'
                  }
                  toColor={
                    transaction.toAccount.type === 0 ? '#438763' : '#ad6b8d'
                  }
                  fromAccount={transaction.fromAccount.id.name}
                  toAccount={transaction.toAccount.id.name}
                  cost={transaction.amount}
                  time={new Date(transaction.createdAt).toLocaleDateString(
                    i18n.t('local'),
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )}
                  onRemove={() => this.handleRemoveTransaction(transaction._id)}
                  responsed={deleteFailNotification}
                />
              ))
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
        <SnackBar
          deleteFailNotification={deleteFailNotification}
          onDismiss={() => this.setState({ deleteFailNotification: false })}
          label={i18n.t('actionHide')}
          text={i18n.t('messageDeleteFail')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  transactions: state.transaction.transactions,
});
const mapDispatchToProps = {
  logout,
  getTransactions,
  chooseTransaction,
  deleteTransactionById,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transaction)
);
