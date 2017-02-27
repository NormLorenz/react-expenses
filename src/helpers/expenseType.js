// http://react.tips/checkboxes-in-react/
// https://facebook.github.io/react/docs/forms.html
// http://stackoverflow.com/questions/4148499/how-to-style-checkbox-using-css
// http://www.inserthtml.com/2013/09/custom-checkbox-set/
// https://codepen.io/bbodine1/pen/novBm
// http://stackoverflow.com/questions/6491962/custom-checkbox
// https://webdesign.tutsplus.com/articles/quick-tip-easy-css3-checkboxes-and-radio-buttons--webdesign-8953

import React, { Component } from 'react';

class ExpenseType extends Component {
  render() {
    let isDebit = this.props.isDebit;

    if (isDebit === true) {
      return (
        <span style={{ cursor: 'pointer' }} type='expenseType' name='isDebit' value='true' onClick={this.props.onChange.bind(this)} className="w3-badge w3-red">debit</span>
      )
    }
    else {
      return (
        <span style={{ cursor: 'pointer' }} type='expenseType' name='isDebit' value='false' onClick={this.props.onChange.bind(this)} className="w3-badge w3-green">credit</span >
      )
    }
  }
}

ExpenseType.propTypes = {
  isDebit: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default ExpenseType;