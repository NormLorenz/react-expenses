import React, { Component } from 'react';

class IsDebit extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span className="w3-badge w3-small w3-green">debit</span>
      )
    }
    else {
      return (
        <span className="w3-badge w3-small w3-red">credit</span>
      )
    }
  }
}

export default IsDebit;