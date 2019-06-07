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
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { List } from 'react-native-paper';
import { getInvoices } from '../redux/actions';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import Loading from '../components/Loading';

class Invoice extends React.Component {
  state = {
    isDatePickerVisible: false,
    activatingDate: undefined,

    expandFilter: false,
    height: new Animated.Value(0),

    fromDate: new Date(),
    toDate: new Date(),
  };

  componentDidMount = () => {
    this.props.getInvoices({
      success: () => {},
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
    if (activatingDate === 'from') {
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

  handlePress = () => {
    const { expandFilter } = this.state;

    if (!expandFilter) {
      Animated.spring(this.state.height, {
        toValue: 85,
      }).start();
    } else {
      Animated.timing(this.state.height, {
        toValue: 0,
      }).start();
    }

    this.setState({
      expandFilter: !expandFilter,
    });
  };

  render() {
    const { navigation, invoices } = this.props;
    const {
      isDatePickerVisible,
      fromDate,
      toDate,
      activatingDate,
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
        <View>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 15,
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 8,
            }}
            onPress={this.handlePress}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <FeatherIcon color={theme.colors.primary} name="filter" />
              <Text style={{ fontSize: 16, paddingLeft: 20 }}>Filter...</Text>
            </View>
            <FeatherIcon color={theme.colors.primary} name="chevron-down" />
          </TouchableOpacity>

          <Animated.View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 5,
              backgroundColor: '#f1f1f1',

              height: this.state.height,
              overflow: 'hidden',
            }}
          >
            <View style={{ width: '50%', padding: 10, paddingTop: 5 }}>
              <Text>From</Text>
              <TouchableOpacity onPress={() => this.showDateTimePicker('from')}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text>{fromDate.toLocaleDateString('vi-VN')}</Text>
                  <Text style={{ position: 'absolute', right: 5, top: 3 }}>
                    <FeatherIcon name="chevron-down" />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 10, paddingTop: 5 }}>
              <Text>To</Text>
              <TouchableOpacity onPress={() => this.showDateTimePicker('to')}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#aaa',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text>{toDate.toLocaleDateString('vi-VN')}</Text>
                  <Text style={{ position: 'absolute', right: 5, top: 3 }}>
                    <FeatherIcon name="chevron-down" />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <DateTimePicker
            isDatePickerVisible={isDatePickerVisible}
            date={activatingDate === 'from' ? fromDate : toDate}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>

        {invoices ? (
          <ScrollView>
            {invoices.invoices.map(invoice => (
              <List.Item
                key={invoice._id}
                title={`${new Date(invoice.createdAt).toLocaleDateString(
                  'vi-VN'
                )} - ${invoice.totalCost}đ`}
                description={`${invoice.status ? 'Done' : 'Not yet'}`}
                left={props => <List.Icon {...props} icon="folder" />}
              />
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
  getInvoices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
