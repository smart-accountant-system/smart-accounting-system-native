/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
  FilterHeader,
  FilterBody,
  FilterField,
  FilterTime,
} from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { FeatherIcon, Loading, Empty } from '../components';
import { handle401 } from '../constants/strategies';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import { getInvoiceById, getPayments } from '../redux/actions';
import { PaymentSection } from '../containers/InvoiceDetail';

class InvoiceDetail extends React.Component {
  state = {
    refreshing: false,

    isDatePickerVisible: false,
    activatingDate: undefined,
    fromDate: new Date(),
    toDate: new Date(),

    isExpandingFilter: false,
    filterHeight: new Animated.Value(0),
    loading: false,
  };

  _onRefresh = () => {
    const { navigation } = this.props;
    const _id = navigation.getParam('_id', '');
    this.setState({ refreshing: true });

    this.props.getPayments(
      _id,
      {},
      {
        success: () => {
          this.setState({ refreshing: false });
        },
        false: () => {
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
    const { navigation } = this.props;
    const { filterHeight, fromDate, toDate } = this.state;
    const _id = navigation.getParam('_id', '');

    this.setState({ loading: true });

    Animated.timing(filterHeight, {
      toValue: 0,
    }).start();

    this.setState({
      isExpandingFilter: false,
    });

    this.props.getPayments(
      _id,
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

  getNewestInvoice = () => {
    const {
      navigation,
      invoices: { invoices },
    } = this.props;

    const _id = navigation.getParam('_id', '');

    let invoice;

    invoices.map(item => {
      if (item._id == _id) {
        invoice = item;
      }
    });
    return invoice;
  };

  render() {
    const {
      navigation,
      user: { info },
    } = this.props;
    const _id = navigation.getParam('_id', '');

    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
      refreshing,
      isExpandingFilter,
      loading,
    } = this.state;
    const { payments } = this.getNewestInvoice();

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('InvoiceDetail')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('payment')}</Typography>
            {info.role === ROLE.STAFF ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PaymentAddition', {
                    _id,
                    previous: 'Payment',
                  });
                }}
              >
                <FeatherIcon color={theme.colors.white} name="plus" />
              </TouchableOpacity>
            ) : (
              <FeatherIcon color={theme.colors.primary} name="user" />
            )}
          </Header>
        </HeaderWrapper>
        <FilterHeader
          isExpand={isExpandingFilter}
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
        {payments && !loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!payments.payments.length ? (
              <Empty name={i18n.t('payment')} />
            ) : (
              <PaymentSection payments={payments.payments} />
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  getInvoiceById,
  getPayments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
