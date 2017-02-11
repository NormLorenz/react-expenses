import React, { Component } from 'react';

class Debit extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span className="w3-badge w3-red">debit</span>
      )
    }
    else {
      return (
        <span className="w3-badge w3-green">credit</span>
      )
    }
  }
}

Debit.propTypes = {
  isDebit: React.PropTypes.bool.isRequired
};

export default Debit;