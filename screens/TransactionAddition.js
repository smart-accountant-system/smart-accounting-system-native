/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import i18n from 'i18n-js';
import { Snackbar, Button } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { AmazingText } from '../containers/InvoiceAddition';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';
import { addReceiptToTransaction } from '../redux/actions';
import { handle401, toInt } from '../constants/strategies';
import { PaymentInReceipt } from '../containers/Receipt';
import { ItemWithoutRemove } from '../containers/CustomerManagement';
import { ReceiptInTransaction } from '../containers/Transaction';

class ReceiptAddition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {};

  handleAdd = () => {};

  render() {
    const { navigation, currentReceiptInTracsaction } = this.props;
    const { isVisible, isLoading } = this.state;
    console.log(currentReceiptInTracsaction);

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('transactionAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          {currentReceiptInTracsaction ? (
            <ReceiptInTransaction
              receipt={currentReceiptInTracsaction}
              onPress={() => navigation.navigate('ReceiptsInTransaction')}
            />
          ) : (
            <AmazingText
              onPress={() => navigation.navigate('ReceiptsInTransaction')}
              content="Choose receipt"
            />
          )}
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleAdd}
              loading={isLoading}
            >
              <Text>{i18n.t('actionSave')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>

        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentReceiptInTracsaction:
    state.transaction.currentReceiptInTransactionAddition,
});
const mapDispatchToProps = {
  addReceiptToTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptAddition);
