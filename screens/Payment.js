/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { Snackbar } from 'react-native-paper';

import Filter from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { FeatherIcon, Loading, Empty } from '../components';
import { handle401 } from '../constants/strategies';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import {
  logout,
  getInvoiceById,
  getPaymentsForInvoice,
  removePayment,
} from '../redux/actions';
import { PaymentSection } from '../containers/InvoiceDetail';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this._id = navigation.getParam('_id', '');
    this.state = {
      refreshing: false,

      isDatePickerVisible: false,
      activatingDate: undefined,
      fromDate: new Date(),
      toDate: new Date(),

      isExpandingFilter: false,
      filterHeight: new Animated.Value(0),
      loading: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    this.props.getPaymentsForInvoice(
      { invoice: this._id },
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
    const { filterHeight, fromDate, toDate } = this.state;

    this.setState({ loading: true });

    Animated.timing(filterHeight, {
      toValue: 0,
    }).start();

    this.setState({
      isExpandingFilter: false,
    });

    this.props.getPaymentsForInvoice(
      {
        invoice: this._id,
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
      invoices: { invoices },
    } = this.props;

    for (let i = 0; i < invoices.length; i++)
      if (invoices[i]._id == this._id) {
        return invoices[i];
      }
  };

  handleRemove = _id => {
    this.props.removePayment(_id, {
      success: () => {
        LayoutAnimation.spring();
        this.props.getInvoiceById(this._id, {
          success: () => {
            this.setState({ refreshing: false });
          },
          handle401: () =>
            handle401({
              logout: this.props.logout,
              navigation: this.props.navigation,
            }),
        });
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
      user: { info },
    } = this.props;

    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
      refreshing,
      loading,
      visibleSnackbar,
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
                    _id: this._id,
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
              <PaymentSection
                onRemove={this.handleRemove}
                payments={payments.payments}
              />
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
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  logout,
  getInvoiceById,
  getPaymentsForInvoice,
  removePayment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
