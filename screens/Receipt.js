/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import i18n from 'i18n-js';
import { getReceipts } from '../actions';

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
            <TouchableOpacity onPress={this.handle}>
              <ReceiptItem
                customer="FPT"
                id="#0000001"
                type={1}
                date="May 24, 2019"
                price="đ7,000,000"
              />
            </TouchableOpacity>
          </ScrollView>
        </HomeBodyWrapper>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  receipts: state.receipt,
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
