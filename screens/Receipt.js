/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { Button, withTheme } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text, View, ScrollView, Animated, RefreshControl } from 'react-native';

import {
  FilterHeader,
  FilterBody,
  FilterField,
  FilterTime,
} from '../components/Filter';
import theme from '../constants/theme';
import { getReceipts } from '../redux/actions';
import { FeatherIcon, Loading } from '../components';
import { ReceiptItem, ReceiptContent } from '../containers/Receipt';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class Receipt extends React.Component {
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
    this.props.getReceipts({
      success: () => {},
      failure: () => {},
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getReceipts({
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

    this.props.getReceipts({
      params: {
        startDate: new Date(fromDate.toDateString()),
        endDate: new Date(toDate.toDateString()),
      },
      success: () => {},
      failure: () => {},
    });
  };

  receiptDetail = item => {
    const { navigation } = this.props;
    navigation.navigate('ReceiptDetail', { item });
  };

  render() {
    const { receipts } = this.props;
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
            <Typography>{i18n.t('receipt')}</Typography>
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

        {receipts ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {receipts.receipts.map(receipt => (
              <ReceiptItem
                receipt={receipt}
                receiptDetail={this.receiptDetail}
                key={receipt._id}
              >
                <ReceiptContent
                  id={receipt._id}
                  customer={receipt.customer.name}
                  payment={receipt.payment.category.name}
                  type={
                    receipt.payment.type === 0
                      ? 'Receipt voucher' // phieu thu
                      : 'Payment voucher' // phieu chi
                  }
                  color={receipt.status ? '#438763' : '#ad6b8d'}
                  status={
                    receipt.status
                      ? 'Recorded as a transaction'
                      : 'Not record as a transaction yet'
                  }
                  cost={receipt.payment.amountMoney}
                  time={new Date(receipt.createdAt).toLocaleDateString(
                    'vi-VN',
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )}
                />
              </ReceiptItem>
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
  receipts: state.receipt.receipts,
});
const mapDispatchToProps = {
  getReceipts,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Receipt)
);
