import React, { Component } from 'react';
import './mySelect.css';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types'; // ES6

class MySelect extends Component {

  render() {

    const className = classnames(
      this.props.className,
      {
        'placeholder': !this.props.value
      }
    );

    return (
      <select className={className} style={{ paddingLeft: '6px' }} name={this.props.name} value={this.props.value} onChange={this.props.onChange} >
        <option className='w3-text-grey' key='-1' value=''>{this.props.text}</option>
        {this.props.options.map((option) => { return <option className='w3-text-grey' key={option.key} value={option.key}>{option.data.description}</option>; })}
      </select>
    );
  }
}

MySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  text: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default MySelect;

