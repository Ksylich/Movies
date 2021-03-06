import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import ErrorIndicator from '../error-indicator';

export default class ErrorBoundry extends Component {
    state = {
      hasError: false,
    };

    static propTypes = {
      children: PropTypes.node.isRequired,
    };

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    render() {
      const { hasError } = this.state;
      const { children } = this.props;
      if (hasError) {
        return <ErrorIndicator />;
      }
      return children;
    }
}
