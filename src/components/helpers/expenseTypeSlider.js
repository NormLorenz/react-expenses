// http://react.tips/checkboxes-in-react/
// https://facebook.github.io/react/docs/forms.html
// http://stackoverflow.com/questions/4148499/how-to-style-checkbox-using-css
// http://www.inserthtml.com/2013/09/custom-checkbox-set/
// https://codepen.io/bbodine1/pen/novBm
// http://stackoverflow.com/questions/6491962/custom-checkbox
// https://webdesign.tutsplus.com/articles/quick-tip-easy-css3-checkboxes-and-radio-buttons--webdesign-8953

import React, { Component } from 'react';
import './expenseTypeSlider.css';
import PropTypes from 'prop-types'; // ES6

class ExpenseTypeSlider extends Component {
  render() {
    return (
      <div className='expenseTypeSlider'>
        <input type='checkbox' value='none' id='expenseTypeSlider' name={this.props.name} checked={this.props.checked} onChange={this.props.onChange.bind(this)} />
        <label htmlFor='expenseTypeSlider'></label>
      </div>
    );
  }
}

ExpenseTypeSlider.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ExpenseTypeSlider;