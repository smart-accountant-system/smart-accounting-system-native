/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import moment from 'moment';

import i18n from 'i18n-js';
import { getReceipts } from '../redux/actions';

import {
  HeaderWrapper,
  Header,
  Typography,
  HomeBodyWrapper,
} from '../containers/Home';
import theme from '../constants/theme';
import FeatherIcon from '../components/FeatherIcon';
import { DateFilterWrapper } from '../containers/Receipt';
import ReceiptItem from '../components/ReceiptItem';

class Receipt extends React.Component {
  componentDidMount = () => {
    this.props.getReceipts({
      success: () => {},
      failure: () => {},
    });
  };

  receiptDetail = item => {
    const { navigation } = this.props;
    navigation.navigate('ReceiptDetail', { item });
  };

  render() {
    const { navigation, receipts } = this.props;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('receipt')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        {receipts ? (
          <HomeBodyWrapper>
            <ScrollView>
              {receipts.receipts.map(item => (
                <TouchableOpacity
                  onPress={() => this.receiptDetail(item)}
                  key={item._id}
                >
                  <ReceiptItem
                    customer={item.customer.name}
                    type={item.type}
                    date={moment(item.createdAt).format('MMM DD, YYYY')}
                    item={item}
                    price={item.payment.amountMoney}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </HomeBodyWrapper>
        ) : (
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.grey} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  receipts: state.receipt.receipts,
});
const mapDispatchToProps = {
  getReceipts,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Receipt)
);
