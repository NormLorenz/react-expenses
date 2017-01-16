import React, { Component } from 'react';

class Debit extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span className="w3-badge w3-small w3-green">Debit</span>
      )
    }
    else {
      return (
        <span className="w3-badge w3-small w3-red">Credit</span>
      )
    }
  }
}

export default Debit;