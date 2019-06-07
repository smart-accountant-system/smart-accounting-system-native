import React from 'react';
import i18n from 'i18n-js';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { HeaderWrapper, Header, Typography } from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';

class Invoice extends React.Component {
  state = {
    isVisible: false,
    activating: undefined,
    fromDate: new Date(),
    toDate: new Date(),
  };

  showDateTimePicker = activating => {
    this.setState({ isVisible: true, activating });
  };

  hideDateTimePicker = () => {
    this.setState({ isVisible: false });
  };

  handleDatePicked = date => {
    const { activating } = this.state;
    if (activating === 'from') {
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

  render() {
    const { navigation } = this.props;
    const { isVisible, fromDate, toDate, activating } = this.state;
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
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ width: '50%', padding: 5 }}>
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
            <View style={{ width: '50%', padding: 5 }}>
              <Text>To</Text>
              <TouchableOpacity onPress={() => this.showDateTimePicker('to')}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
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
          </View>
          <DateTimePicker
            isVisible={isVisible}
            date={activating === 'from' ? fromDate : toDate}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </View>
    );
  }
}

export default Invoice;
