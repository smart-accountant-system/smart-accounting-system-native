/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { Snackbar } from 'react-native-paper';

import {
  logout,
  getInvoices,
  removeInvoice,
  getPaymentsForInvoice,
} from '../redux/actions';
import Filter from '../components/Filter';
import ROLE from '../constants/role';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading, Empty } from '../components';

import { InvoiceItem, InvoiceContent } from '../containers/Invoice';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class Invoice extends React.Component {
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
    this.props.getInvoices(
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

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getInvoices(
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

    this.props.getInvoices(
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

  invoiceDetail = ({ _id }) => {
    const { navigation } = this.props;
    navigation.navigate('InvoiceDetail', {
      _id,
    });

    this.props.getPaymentsForInvoice(
      { invoice: _id },
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleRemoveInvoice = _id => {
    this.props.removeInvoice(_id, {
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
      invoices,
      user: { info },
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
            <TouchableOpacity
              onPress={() => navigation.navigate('InvoiceScanner')}
            >
              <FeatherIcon color={theme.colors.white} name="eye" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoice')}</Typography>
            {info.role === ROLE.STAFF ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('InvoiceAddition')}
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

        {invoices && !loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!invoices.invoices.length ? (
              <Empty name={i18n.t('invoice')} />
            ) : (
              invoices.invoices.map(invoice => (
                <InvoiceItem
                  disabled={info.role !== ROLE.STAFF}
                  key={invoice._id}
                  onRemove={() => this.handleRemoveInvoice(invoice._id)}
                  invoice={invoice}
                  invoiceDetail={this.invoiceDetail}
                >
                  <InvoiceContent
                    id={invoice._id}
                    name={
                      invoice.type === 0 ? i18n.t('purchase') : i18n.t('sale')
                    }
                    color={invoice.status ? '#438763' : '#ad6b8d'}
                    status={invoice.status ? i18n.t('paid') : i18n.t('unpaid')}
                    cost={invoice.totalCost}
                    time={new Date(invoice.createdAt).toLocaleDateString(
                      i18n.t('local'),
                      {
                        day: 'numeric',
                        month: 'long',
                      }
                    )}
                  />
                </InvoiceItem>
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
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  logout,
  getInvoices,
  removeInvoice,
  getPaymentsForInvoice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
