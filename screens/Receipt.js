/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';
import {
  View,
  ScrollView,
  Animated,
  RefreshControl,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import Filter from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import {
  logout,
  getReceipts,
  chooseReceipt,
  deleteReceiptById,
} from '../redux/actions';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Empty } from '../components';
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
    visibleSnackbar: false,
    loading: false,
  };

  componentDidMount = () => {
    this.props.getReceipts(
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

  receiptDetail = receipt => {
    const { navigation } = this.props;
    this.props.chooseReceipt(receipt);
    navigation.navigate('ReceiptDetail');
  };

  handleRemoveReceipt = id => {
    this.props.deleteReceiptById(id, {
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
            <FeatherIcon color={theme.colors.primary} name="user" />
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
                <ReceiptItem
                  disabled={info.role !== ROLE.STAFF}
                  receipt={receipt}
                  receiptDetail={this.receiptDetail}
                  key={receipt._id}
                  onRemove={() => this.handleRemoveReceipt(receipt._id)}
                >
                  <ReceiptContent
                    id={receipt._id}
                    customer={receipt.customer.name}
                    payment={receipt.payment.category.name}
                    type={
                      receipt.payment.type === 0
                        ? i18n.t('receiptVoucher')
                        : i18n.t('paymentVoucher')
                    }
                    color={receipt.status ? '#438763' : '#ad6b8d'}
                    status={
                      receipt.status
                        ? i18n.t('receiptRecoredAsTransaction')
                        : i18n.t('receiptNotRecoredAsTransaction')
                    }
                    cost={receipt.payment.amountMoney}
                    time={new Date(receipt.createdAt).toLocaleDateString(
                      i18n.t('local'),
                      {
                        day: 'numeric',
                        month: 'long',
                      }
                    )}
                  />
                </ReceiptItem>
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
  logout,
  getReceipts,
  chooseReceipt,
  deleteReceiptById,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Receipt)
);
