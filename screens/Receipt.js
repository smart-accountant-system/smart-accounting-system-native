/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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

  render() {
    const { navigation, receipts } = this.props;
    console.log(receipts);
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <FeatherIcon color={theme.colors.primary} name="user" />
            <Typography>{i18n.t('receipt')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <HomeBodyWrapper>
          <ScrollView>
            {receipts
              ? receipts.receipts.map(item => (
                  <TouchableOpacity onPress={this.handle} key={item._id}>
                    <ReceiptItem
                      customer={item.customer.name}
                      type={item.type}
                      date={moment(item.createdAt).format('MMM DD, YYYY')}
                      item={item}
                      price={item.payment.amountMoney}
                    />
                  </TouchableOpacity>
                ))
              : null}
          </ScrollView>
        </HomeBodyWrapper>
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
