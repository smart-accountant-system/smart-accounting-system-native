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
import { Button, Snackbar } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
  logout,
  getInvoices,
  chooseInvoice,
  removeInvoice,
} from '../redux/actions';
import {
  FilterHeader,
  FilterBody,
  FilterField,
  FilterTime,
} from '../components/Filter';
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
  };

  componentDidMount = () => {
    this.props.getInvoices(
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
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  invoiceDetail = invoice => {
    const { navigation } = this.props;
    this.props.chooseInvoice(invoice);
    navigation.navigate('InvoiceDetail');
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
    } = this.state;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
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

        {invoices ? (
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
                  key={invoice._id}
                  onRemove={() => this.handleRemoveInvoice(invoice._id)}
                  invoice={invoice}
                  invoiceDetail={this.invoiceDetail}
                >
                  <InvoiceContent
                    id={invoice._id}
                    name={invoice.type === 0 ? 'Purchase' : 'Sale'}
                    color={invoice.status ? '#438763' : '#ad6b8d'}
                    status={invoice.status ? 'Paid' : 'Unpaid'}
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
  loading: state.invoice.isLoading,
});
const mapDispatchToProps = {
  logout,
  getInvoices,
  chooseInvoice,
  removeInvoice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
