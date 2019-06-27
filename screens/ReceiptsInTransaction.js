/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { Button, withTheme, Snackbar } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Text,
  View,
  ScrollView,
  Animated,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {
  FilterHeader,
  FilterBody,
  FilterField,
  FilterTime,
} from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { getReceipts, addReceiptToTransaction } from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Empty } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { ReceiptInTransaction } from '../containers/Transaction';

class ReceiptsInTransaction extends React.Component {
  state = {
    isDatePickerVisible: false,
    activatingDate: undefined,
    fromDate: new Date(),
    toDate: new Date(),

    isExpandingFilter: false,
    filterHeight: new Animated.Value(0),

    refreshing: false,
    visibleSnackbar: false,
    loading: false,
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getReceipts(
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

    this.props.getReceipts(
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

  handleAddReceiptToTransaction = receipt => {
    const { navigation } = this.props;
    this.props.addReceiptToTransaction(receipt);
    navigation.goBack();
  };

  render() {
    const {
      receipts,
      user: { info },
      navigation,
    } = this.props;
    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
      refreshing,
      visibleSnackbar,
      loading,
    } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('receipt')}</Typography>
            {info.role === ROLE.STAFF ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('ReceiptAddition')}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            ) : (
              <FeatherIcon color={theme.colors.primary} name="plus" />
            )}
          </Header>
        </HeaderWrapper>

        <FilterHeader
          isExpand={this.state.isExpandingFilter}
          onPress={this.handlePressFilter}
        />

        <FilterBody height={this.state.filterHeight}>
          <FilterField first>
            <FilterTime
              title={i18n.t('from')}
              first
              date={fromDate.toLocaleDateString(i18n.t('local'))}
              showDateTimePicker={this.showDateTimePicker}
            />
            <FilterTime
              title={i18n.t('to')}
              second
              date={toDate.toLocaleDateString(i18n.t('local'))}
              showDateTimePicker={this.showDateTimePicker}
            />
          </FilterField>

          <FilterField height="52">
            <FeatherIcon color="#f1f1f1" name="user" />
            <Button mode="contained" onPress={this.doFilter}>
              <Text style={{ color: theme.colors.white }}>
                {i18n.t('doFilter')}
              </Text>
            </Button>
          </FilterField>
        </FilterBody>

        <DateTimePicker
          isVisible={isDatePickerVisible}
          date={activatingDate === i18n.t('from') ? fromDate : toDate}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

        {receipts && !loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!receipts.receipts.length ? (
              <Empty name={i18n.t('receipt')} />
            ) : (
              receipts.receipts.map(receipt => (
                <ReceiptInTransaction
                  key={receipt._id}
                  receipt={receipt}
                  onPress={() => this.handleAddReceiptToTransaction(receipt)}
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
  receipts: state.receipt.receipts,
});
const mapDispatchToProps = {
  getReceipts,
  addReceiptToTransaction,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReceiptsInTransaction)
);
