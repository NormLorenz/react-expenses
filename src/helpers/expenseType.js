import React, { Component } from 'react';

class ExpenseType extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span style={{ cursor: 'pointer' }} onClick={this.props.onClick} className="w3-badge w3-green">debit</span>
      )
    }
    else {
      return (
        <span style={{ cursor: 'pointer' }} onClick={this.props.onClick} className="w3-badge w3-red" > credit</span >
      )
    }
  }
}

ExpenseType.propTypes = {
  isDebit: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default ExpenseType;