/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Icon } from 'expo';

import theme from '../constants/theme';

export default class FeatherIcon extends React.Component {
  render() {
    const { marginBottom } = this.props;
    return (
      <Icon.Feather
        name={this.props.name}
        size={this.props.size || 26}
        style={{ marginBottom: marginBottom || -3 }}
        color={
          this.props.color ||
          (this.props.focused
            ? theme.colors.primary
            : theme.colors.tabIconDefault)
        }
      />
    );
  }
}
