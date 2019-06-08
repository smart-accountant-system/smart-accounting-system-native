/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import i18n from 'i18n-js';

import { HeaderWrapper, Header, Typography } from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import TransactionItem from '../components/TransactionItem';
import { getTransactions } from '../redux/actions';
import Loading from '../components/Loading';
import {
  FilterHeader,
  FilterBody,
  FilterField,
  FilterTime,
} from '../components/Filter';

class Transaction extends React.Component {
  state = {
    isDatePickerVisible: false,
    activatingDate: undefined,
    fromDate: new Date(),
    toDate: new Date(),

    isExpandingFilter: false,
    filterHeight: new Animated.Value(0),

    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getTransactions({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getTransactions({
      success: () => {
        this.setState({ refreshing: false });
      },
      failure: () => {},
    });
  };

  showDateTimePicker = activatingDate => {
    this.setState({ isDatePickerVisible: true, activatingDate });
  };

  hideDateTimePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDatePicked = date => {
    const { activatingDate } = this.state;
    if (activatingDate === 'From') {
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

    Animated.timing(filterHeight, {
      toValue: 0,
    }).start();

    this.setState({
      isExpandingFilter: false,
    });

    this.props.getTransactions({
      params: {
        startDate: new Date(fromDate.toDateString()),
        endDate: new Date(toDate.toDateString()),
      },
      success: () => {},
      failure: () => {},
    });
  };

  render() {
    const { navigation, transactions } = this.props;
    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
      refreshing,
    } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('transaction')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>

        <FilterHeader
          title="Advance filter"
          isExpand={this.state.isExpandingFilter}
          onPress={this.handlePressFilter}
        />

        <FilterBody height={this.state.filterHeight}>
          <FilterField first>
            <FilterTime
              title="From"
              first
              date={fromDate.toLocaleDateString('vi-VN')}
              showDateTimePicker={this.showDateTimePicker}
            />
            <FilterTime
              title="To"
              second
              date={toDate.toLocaleDateString('vi-VN')}
              showDateTimePicker={this.showDateTimePicker}
            />
          </FilterField>

          <FilterField height="52">
            <FeatherIcon color="#f1f1f1" name="user" />
            <Button mode="contained" onPress={this.doFilter}>
              <Text style={{ color: theme.colors.white }}>Filter</Text>
            </Button>
          </FilterField>
        </FilterBody>

        <DateTimePicker
          isVisible={isDatePickerVisible}
          date={activatingDate === 'from' ? fromDate : toDate}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        {transactions ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {transactions.transactions.map(transaction => (
              <TouchableOpacity
                key={transaction._id}
                onPress={() =>
                  navigation.navigate('TransactionDetail', { transaction })
                }
              >
                <TransactionItem
                  fromAccount={transaction.fromAccount.id.name}
                  toAccount={transaction.toAccount.id.name}
                  price={transaction.amount}
                  date={new Date(transaction.createdAt).toLocaleDateString(
                    'vi-VN'
                  )}
                />
              </TouchableOpacity>
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
  transactions: state.transaction.transactions,
});
const mapDispatchToProps = { getTransactions };

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transaction)
);
