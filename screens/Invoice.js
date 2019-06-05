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
    fromDate: '20/11/2019',
    toDate: '20/11/2020',
  };

  showDateTimePicker = () => {
    this.setState({ isVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isVisible: false });
  };

  handleDatePicked = date => {
    this.hideDateTimePicker();
  };

  render() {
    const { navigation } = this.props;
    const { isVisible, fromDate, toDate } = this.state;
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
              <TouchableOpacity onPress={this.showDateTimePicker}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text>{fromDate}</Text>
                  <Text style={{ position: 'absolute', right: 5, top: 3 }}>
                    <FeatherIcon name="chevron-down" />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 5 }}>
              <Text>To</Text>
              <TouchableOpacity onPress={this.showDateTimePicker}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text>{toDate}</Text>
                  <Text style={{ position: 'absolute', right: 5, top: 3 }}>
                    <FeatherIcon name="chevron-down" />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text onPress={this.showDateTimePicker}>TIMEEEEEEE</Text>
          <DateTimePicker
            isVisible={isVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </View>
    );
  }
}

export default Invoice;
