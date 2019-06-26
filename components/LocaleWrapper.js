import React from 'react';

import { setLocale } from '../locale';

class LocaleWrapper extends React.Component {
  componentWillMount() {
    setLocale();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default LocaleWrapper;
