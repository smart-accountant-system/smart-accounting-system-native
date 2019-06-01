/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Icon } from 'expo';

import theme from '../constants/theme';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused
            ? theme.colors.primary
            : theme.colors.tabIconDefault
        }
      />
    );
  }
}
