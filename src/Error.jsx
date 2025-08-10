import React, { Component } from 'react';

/**
 * ErrorBoundary component that catches and displays errors.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state with error information.
   * @param {Error} error - The error that occurred.
   * @returns {Object} Updated state.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error to console and error reporting service.
   * @param {Error} error - The error that occurred.
   * @param {Object} errorInfo - Additional error information.
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log error to error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>
            <summary>Error details</summary>
            <pre>
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
