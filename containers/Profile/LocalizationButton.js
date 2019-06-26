/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import theme from '../../constants/theme';
import { changeLocalization } from '../../redux/actions';
import { getLocaleString } from '../../locale';
import Layout from '../../constants/Layout';

const { deviceWidth } = Layout;

const LocalizationWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-color: grey;
  border-bottom-width: 0.5;
  border-top-color: grey;
  border-top-width: 0.5;
`;

const LanguageButton = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${deviceWidth / 2};
  height: 50px;
  padding: 5px;
  background-color: ${({ isChoose }) =>
    isChoose ? theme.colors.primary : '#fff'};
`;

const LanguageText = styled.Text`
  color: ${({ isChoose }) => (isChoose ? '#fff' : '#000')};
`;

const FormWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LanguageWrapper = ({ isChoose, onPress, text }) => (
  <TouchableOpacity onPress={onPress}>
    <LanguageButton isChoose={isChoose}>
      <LanguageText isChoose={isChoose}>{text}</LanguageText>
    </LanguageButton>
  </TouchableOpacity>
);

class Localization extends React.Component {
  render() {
    const { localization } = this.props;
    return (
      <LocalizationWrapper>
        <FormWrapper>
          <LanguageWrapper
            text={getLocaleString('vi')}
            isChoose={localization === 'vi'}
            onPress={() => this.props.changeLocalization('vi')}
          />
          <LanguageWrapper
            text={getLocaleString('en')}
            isChoose={localization === 'en'}
            onPress={() => this.props.changeLocalization('en')}
          />
        </FormWrapper>
      </LocalizationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  localization: state.user.localization,
});
const mapDispatchToProps = {
  changeLocalization,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localization);
