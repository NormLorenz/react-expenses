import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

class ExpenseTypeDisplay extends Component {
  render() {
    if (this.props.isDebit === true) {
      return (
        <span>cash out</span>
      );
    }
    else {
      return (
        <span className='w3-text-green'>cash in</span>
      );
    }
  }
}

ExpenseTypeDisplay.propTypes = {
  isDebit: PropTypes.bool.isRequired
};

export default ExpenseTypeDisplay;