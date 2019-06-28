/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Icon } from 'expo';

import theme from '../constants/theme';

export default class MaterialCommunityIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={this.props.size || 26}
        style={{ marginBottom: -3 }}
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
