import React from 'react';
import i18n from 'i18n-js';
import { Localization } from 'expo';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { HeaderWrapper, Header, Typography } from '../containers/Home';
import FeatherIcon from '../components/FeatherIcon';
import theme from '../constants/theme';
import { en, vi } from '../constants/localization';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

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
            <TouchableOpacity
              style={{ width: '50%' }}
              onPress={this.showDateTimePicker}
            >
              <TextInput
                label="From"
                mode="outlined"
                disabled
                value={fromDate}
                onPress={this.showDateTimePicker}
              />
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <TextInput label="To" value={toDate} />
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
