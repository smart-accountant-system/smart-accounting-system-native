/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
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
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading } from '../components';
import { logout, getInvoices, chooseInvoice } from '../redux/actions';
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
    navigation.navigate('InvoiceDetail');
    this.props.chooseInvoice(invoice);
  };

  render() {
    const { navigation, invoices } = this.props;
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
          <StatusBar barStyle="light-content" />
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('invoice')}</Typography>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <FeatherIcon color={theme.colors.white} name="plus" />
            </TouchableOpacity>
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

        {invoices ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {invoices.invoices.map(invoice => (
              <InvoiceItem
                key={invoice._id}
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
                    'vi-VN',
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )}
                />
              </InvoiceItem>
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
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = {
  logout,
  getInvoices,
  chooseInvoice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
