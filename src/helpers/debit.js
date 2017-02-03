import React, { Component } from 'react';

class Debit extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span className="w3-badge w3-green">debit</span>
      )
    }
    else {
      return (
        <span className="w3-badge w3-red">credit</span>
      )
    }
  }
}

export default Debit;